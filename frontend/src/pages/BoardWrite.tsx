import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../assets/styles/BoardForm.css';
import { Board, BoardWriteRequest } from '../types/board';

const BoardWrite: React.FC = () => {
    const navigate = useNavigate();
    const [boardData, setBoardData] = useState<BoardWriteRequest>({
        boardTitle: '',
        boardWriter: '',
        boardPass: '',
        boardContent: '',
    });
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBoardData({ ...boardData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setSelectedFiles(files);

        const imageUrls = files.map(file => URL.createObjectURL(file));
        setPreviewImages(imageUrls);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 필수 입력 필드 유효성 검사 (프론트엔드에서 1차 검증)
        if (!boardData.boardTitle || !boardData.boardWriter || !boardData.boardPass || !boardData.boardContent) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        // 백엔드 요청을 위한 FormData 생성
        const formData = new FormData();
        formData.append('boardTitle', boardData.boardTitle);
        formData.append('boardWriter', boardData.boardWriter);
        formData.append('boardPass', boardData.boardPass);
        formData.append('boardContent', boardData.boardContent);

        selectedFiles.forEach(file => {
            formData.append('boardFiles', file); // 백엔드 BoardController의 @RequestParam("boardFiles")와 일치
        });

        try {
            // 백엔드 API 호출
            await axios.post('http://localhost:8080/api/boards', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // 파일 업로드 시 필수
                },
            });
            alert('게시글이 성공적으로 작성되었습니다.');
            navigate('/'); // 목록 페이지로 이동
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("게시글 작성 실패:", error.response?.data || error.message);
                alert(`게시글 작성에 실패했습니다: ${error.response?.data?.message || '알 수 없는 오류'}`);
            } else {
                console.error("게시글 작성 실패:", error);
                alert('게시글 작성에 실패했습니다. 알 수 없는 오류입니다.');
            }
        }
    };

    return (
        <div className="board-form-container">
            <h2>새 게시글 작성</h2>
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
                        maxLength={100} // 백엔드와 일관성 유지
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="boardWriter">작성자</label>
                    <input
                        type="text"
                        id="boardWriter"
                        name="boardWriter"
                        value={boardData.boardWriter}
                        onChange={handleChange}
                        required
                        maxLength={20}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="boardPass">비밀번호</label>
                    <input
                        type="password"
                        id="boardPass"
                        name="boardPass"
                        value={boardData.boardPass}
                        onChange={handleChange}
                        required
                        minLength={4} // 백엔드와 일관성 유지
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
                <div className="form-group">
                    <label htmlFor="boardFile">첨부 파일</label>
                    <input
                        type="file"
                        id="boardFile"
                        name="boardFiles"
                        multiple
                        onChange={handleFileChange}
                        accept="image/*" // 이미지 파일만 선택 가능하도록 제한 (선택 사항)
                    />
                    {previewImages.length > 0 && (
                        <div className="file-previews">
                            {previewImages.map((url, index) => (
                                <img key={index} src={url} alt={`Preview ${index}`} className="file-preview-image" />
                            ))}
                        </div>
                    )}
                </div>
                <div className="form-actions">
                    <button type="submit">작성</button>
                    <button type="button" onClick={() => navigate('/')} className="cancel-button">취소</button>
                </div>
            </form>
        </div>
    );
}

export default BoardWrite;
