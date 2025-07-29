import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Board, FileResponse } from '../types/board';
import '../assets/styles/BoardDetail.css';

const BoardDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // useParams에서 id는 string 타입으로 넘어옴
    const navigate = useNavigate();
    const [board, setBoard] = useState<Board | null>(null); // Board 타입 또는 null
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState<string>('');
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await axios.get<Board>(`http://localhost:8080/api/boards/${id}`);
                setBoard(response.data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`게시글을 불러오는데 실패했습니다: ${err.message}`);
                } else {
                    setError("알 수 없는 오류가 발생했습니다.");
                }
                console.error("Error fetching board:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBoard();
    }, [id]);

    const handleDelete = async () => {
        if (!board) return; // board가 null일 경우를 대비

        if (password === board.boardPass) {
            try {
                await axios.delete(`http://localhost:8080/api/boards/${id}`); // 백엔드 삭제 API 호출
                alert('게시글이 삭제되었습니다.');
                navigate('/'); // 목록 페이지로 이동
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    alert(`삭제에 실패했습니다: ${err.response?.data || err.message}`);
                } else {
                    alert('삭제에 실패했습니다. 알 수 없는 오류입니다.');
                }
                console.error("Error deleting board:", err);
            }
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
        setShowDeleteModal(false);
    };

    if (loading) return <div className="loading">게시글을 불러오는 중...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!board) return <div className="no-board">게시글을 찾을 수 없습니다.</div>;

    return (
        <div className="board-detail-container">
            <h2 className="board-title">{board.boardTitle}</h2>
            <div className="board-meta-info">
                <span>작성자: {board.boardWriter}</span>
                <span>조회수: {board.boardHits}</span>
                <span>작성일: {new Date(board.created).toLocaleString()}</span>
            </div>
            <div className="board-content">
                <p>{board.boardContent}</p>
            </div>

            {board.fileAttached === 1 && board.fileList && board.fileList.length > 0 && (
                <div className="board-files">
                    <h4>첨부 파일</h4>
                    <div className="file-images">
                        {board.fileList.map((file: FileResponse) => ( // file에 FileResponse 타입 명시
                            <img
                                key={file.id}
                                src={`http://localhost:8080/upload/${file.storedFileName}`} // 스프링 static 리소스 경로와 일치
                                alt={file.originalFileName}
                                className="attached-image"
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="board-actions">
                <button onClick={() => navigate('/')}>목록</button>
                <button onClick={() => navigate(`/edit/${board.id}`)}>수정</button>
                <button className="delete-button" onClick={() => setShowDeleteModal(true)}>삭제</button>
            </div>

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>게시글 삭제</h3>
                        <p>삭제하려면 비밀번호를 입력하세요.</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            placeholder="비밀번호 입력"
                        />
                        <div className="modal-buttons">
                            <button onClick={handleDelete}>확인</button>
                            <button onClick={() => setShowDeleteModal(false)}>취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BoardDetail;