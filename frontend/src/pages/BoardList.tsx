// src/pages/BoardList.tsx
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Board} from '../types/board'; // 정의한 타입 임포트
import '../assets/styles/BoardList.css';

const BoardList: React.FC = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axios.get<Board[]>('http://localhost:8080/api/boards');
                setBoards(response.data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`게시글을 불러오는데 실패했습니다: ${err.message}`);
                } else {
                    setError("알 수 없는 오류가 발생했습니다.");
                }
                console.error("Error fetching boards:", err);
            } finally {
                setLoading(false);
            }

        };
        fetchBoards();
    }, []);

    if (loading) return <div className="loading">게시글을 불러오는 중...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="board-List-container">
            <h2>게시글 목록</h2>
            <div className="action-bar">
                <Link to="/write" className="write-button">새 글 작성</Link>
            </div>
            {boards.length === 0 ? (
                <p className="no-boards">아직 작성된 게시글이 없습니다.</p>
            ) : (
                <ul className="board-cards">
                    {boards.map((board) => (
                        <li key={board.id} className="board-card">
                            <Link to={`/board/${board.id}`}>
                                <h3>{board.boardTitle}</h3>
                                <p className="board-meta">
                                    <span>작성자: {board.boardWriter}</span>
                                    <span>조회수: {board.boardHits}</span>
                                    <span>작성일: {new Date(board.created).toLocaleDateString()}</span>
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BoardList;