import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Board, BoardUpdateRequest } from '../types/board'; // 타입 임포트
import '../assets/styles/BoardForm.css';

const BoardEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [boardData, setBoardData] = useState<BoardUpdateRequest>({
        boardTitle: '',
        boardContent: '',
        boardPass: '', // 수정 시 입력받을 비밀번호
    });
    const [originalBoard, setOriginalBoard] = useState<Board | null>(null); // 원본 게시글 데이터 (비교용)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await axios.get<Board>(`http://localhost:8080/api/boards/${id}`);
                setOriginalBoard(response.data); // 원본 데이터를 저장
                setBoardData({
                    boardTitle: response.data.boardTitle,
                    boardContent: response.data.boardContent,
                    boardPass: '', // 비밀번호는 수정 시 새로 입력받도록 비워둠
                });
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`게시글을 불러오는데 실패했습니다: ${err.message}`);
                } else {
                    setError("알 수 없는 오류가 발생했습니다.");
                }
                console.error("Error fetching board for edit:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBoard();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBoardData({ ...boardData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!originalBoard) return;

        // 필수 입력 필드 유효성 검사
        if (!boardData.boardTitle || !boardData.boardContent || !boardData.boardPass) {
            alert('제목, 내용, 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            // PUT 요청으로 게시글 수정. 백엔드에서 비밀번호 검증이 이루어져야 함.
            // 여기서는 boardPass를 함께 전송하여 백엔드가 검증하도록 합니다.
            await axios.put(`http://localhost:8080/api/boards/${id}`, {
                boardTitle: boardData.boardTitle,
                boardContent: boardData.boardContent,
                boardPass: boardData.boardPass // 비밀번호를 함께 전송
            });
            alert('게시글이 성공적으로 수정되었습니다.');
            navigate(`/board/${id}`); // 상세 페이지로 이동
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("게시글 수정 실패:", error.response?.data || error.message);
                alert(`게시글 수정에 실패했습니다: ${error.response?.data?.message || '비밀번호가 틀렸거나 알 수 없는 오류'}`);
            } else {
                console.error("게시글 수정 실패:", error);
                alert('게시글 수정에 실패했습니다. 알 수 없는 오류입니다.');
            }
        }
    };

    if (loading) return <div className="loading">게시글을 불러오는 중...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!originalBoard) return <div className="no-board">게시글을 찾을 수 없습니다.</div>;

    return (
        <div className="board-form-container">
            <h2>게시글 수정</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="boardTitle">제목</label>
                    <input
                        type="text"
                        id="boardTitle"
                        name="boardTitle"
                        value={boardData.boardTitle}
                        onChange={handleChange}
                        required
                        maxLength={100}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="boardWriter">작성자</label>
                    <input
                        type="text"
                        id="boardWriter"
                        name="boardWriter"
                        value={originalBoard.boardWriter} // 작성자는 수정 불가 (원본 값 사용)
                        readOnly
                        disabled // 필드 비활성화
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="boardPass">비밀번호 확인</label>
                    <input
                        type="password"
                        id="boardPass"
                        name="boardPass"
                        value={boardData.boardPass}
                        onChange={handleChange}
                        placeholder="게시글 비밀번호를 입력하세요"
                        required
                        minLength={4}
                        maxLength={20}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="boardContent">내용</label>
                    <textarea
                        id="boardContent"
                        name="boardContent"
                        value={boardData.boardContent}
                        onChange={handleChange}
                        rows={10}
                        required
                    ></textarea>
                </div>
                {/* 파일 수정/삭제 기능은 백엔드 API가 추가된 후에 구현할 수 있습니다. */}
                <div className="form-actions">
                    <button type="submit">수정 완료</button>
                    <button type="button" onClick={() => navigate(`/board/${id}`)} className="cancel-button">취소</button>
                </div>
            </form>
        </div>
    );
}

export default BoardEdit;