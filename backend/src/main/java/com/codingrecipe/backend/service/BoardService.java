package com.codingrecipe.backend.service;

import com.codingrecipe.backend.dto.BoardDTO;
import com.codingrecipe.backend.entity.BoardEntity;
import com.codingrecipe.backend.entity.FileEntity;
import com.codingrecipe.backend.repository.BoardRepository;
import com.codingrecipe.backend.repository.FileRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final FileRepository fileRepository;

//    private final String filePath = "/Users/leegun/Desktop/개발/프로젝트/renewal-board-app/upload/";

    @Transactional
    public void save(BoardDTO boardDTO, List<MultipartFile> boardFiles) throws IOException {
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setBoardTitle(boardDTO.getBoardTitle());
        boardEntity.setBoardWriter(boardDTO.getBoardWriter());
        boardEntity.setBoardPass(boardDTO.getBoardPass());
        boardEntity.setBoardContent(boardDTO.getBoardContent());
        boardEntity.setBoardHits(0);
        boardEntity.setFileAttached(boardFiles != null && !boardFiles.isEmpty() && !boardFiles.get(0).isEmpty() ? 1 : 0));

        BoardEntity savedBoard = boardRepository.save(boardEntity);

        // 파일 저장
        if (boardEntity.getFileAttached() == 1) {
            for (MultipartFile boardFile : boardFiles) {
                if (!boardFile.isEmpty()) {
                    String originalFileName = boardFile.getOriginalFilename();
                    String uuid = UUID.randomUUID().toString();

                    // 확장자 추출
                    String extension = "";
                    int dotIndex = originalFileName.lastIndexOf(".");
                    if (dotIndex > 0 && dotIndex < originalFileName.length() - 1) {
                        extension = originalFileName.substring(dotIndex);
                    }
                    String storedFileName = uuid + extension; // UUID 확장자에 붙이기
                    String savePath = "/Users/leegun/Documents/spring_upload_files/" + storedFileName;

                    // 로컬에 파일 저장
                    boardFile.transferTo(new File(savePath));

                    // 파일 엔티티 저장
                    FileEntity fileEntity = new FileEntity();
                    fileEntity.setOriginalFileName(originalFileName);
                    fileEntity.setStoredFileName(storedFileName);
                    fileEntity.setFilePath(savePath); // 실제 저장 경로 저장
                    fileEntity.setBoard(savedBoard); // 연관 관계 설정
                    fileRepository.save(fileEntity); // FileRepository 사용
                }
            }
        }
    }

    @Transactional // 조회수 증가도 트랜젝션
    public List<BoardEntity> findAll() {
        return boardRepository.findAll();
    }

    @Transactional
    public Optional<BoardEntity> findById(long id) {
        Optional<BoardEntity> boardOptional = boardRepository.findById(id);

        if (boardOptional.isPresent()) {
            BoardEntity board = boardOptional.get();
            board.setBoardHits(board.getBoardHits() + 1); // 조회수 1증가
            boardRepository.save(board); // 변경된 조회수 저장
        }
        return boardOptional;
    }

    // 수정
    @Transactional
    public void update(BoardEntity boardEntity) {
        Optional<BoardEntity> existingBoard = boardRepository.findById(boardEntity.getId());
        if (existingBoard.isPresent()) {
            BoardEntity boardToUpdate = existingBoard.get();
            boardToUpdate.setBoardTitle(boardEntity.getBoardTitle());
            boardToUpdate.setBoardContent(boardEntity.getBoardContent());
            // 작성자, 비밀번호, 조회수, 파일첨부 여부는 여기서 수정하지 않음
            boardRepository.save(boardToUpdate);
        }
    }

    // 삭제
    @Transactional
    public void delete(long id) {
        boardRepository.deleteById(id);
    }
}


//    public BoardEntity save(BoardEntity boardEntity) {
//        return boardRepository.save(boardEntity);
//    }
//
//    public List<BoardEntity> findAll() {
//        return boardRepository.findAll();
//    }
//
//    public Optional<BoardEntity> findById(long id) {
//        return boardRepository.findById(id);
//    }
//
//    public void deleteById(long id) {
//        boardRepository.deleteById(id);
//    }

// 파일 저장
//        if (boardFiles != null && !boardFiles.isEmpty()) {
//            for (MultipartFile boardFile : boardFiles) {
//                String originalFileName = boardFile.getOriginalFilename();
//                String storageFileName = UUID.randomUUID() + "." + originalFileName;
//                String savePath = filePath + storageFileName;
//
//                // 로컬에 파일 저장
//                boardFile.transferTo(new File(savePath));
//
//                // 파일 엔티티 저장
//                BoardFileEntity boardFileEntity = BoardFileEntity.toBoardFileEntity(savedBoard, originalFileName, storageFileName);
//                boardFileRepository.save(boardFileEntity);
//
//            }
//        }