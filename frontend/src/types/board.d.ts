// 파일 정보 타입
export interface FileResponse {
    id: number;
    originalFileName: string;
    storedFileName: string;
    filePath: string;
}

// 게시글 응답 타입 (백엔드의 Entity or DTO 맞춰 정의)
export interface Board {
    id: number;
    boardTitle: string;
    boardWriter: string;
    boardPass: string;
    boardContent: string;
    boardHits: number;
    created: string; // ISO 8601 형식의 날짜 문자열
    fileAttached: number;
    fileList?: FileResponse[]; // 파일 첨부 목록
}

// 게시글 작성 요청 타입 (프론트에서 백엔드로 보낼 데이터)
export interface BoardWriteRequest {
    boardTitle: string;
    boardWriter: string;
    boardPass: string;
    boardContent: string;
    // 파일은 FormData로 별도 처리되므로 여기에 포함하지 않음
}

// 게시글 수정 요청 타입
export interface BoardUpdateRequest {
    boardTitle: string;
    boardContent: string;
    boardPass: string; // 수정 시 비밀번호 확인용
}

// 에러 응답 타입
export interface ErrorResponse {
    status: string;
    message: string;
}