package com.codingrecipe.backend.service;

import com.codingrecipe.backend.entity.BoardEntity;
import com.codingrecipe.backend.repository.BoardRepository;
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
    private final BoardFileRepository boardFileRepository;

    private final String filePath = "/Users/leegun/Desktop/개발/프로젝트/renewal-board-app/upload/";

    @Transactional
    public void save(BoardDTO boardDTO, List<MultipartFile> boardFiles) throws IOException {
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setBoardTitle(boardDTO.getBoardTitle());
        boardEntity.setBoardWriter(boardDTO.getBoardWriter());
        boardEntity.setBoardPass(boardDTO.getBoardPass());
        boardEntity.setBoardContent(boardDTO.getBoardContent());
        boardEntity.setBoardHits(0);
        boardEntity.setFileAttached(boardFiles != null && !boardFiles.isEmpty() ? 1 : 0);

        BoardEntity savedBoard = boardRepository.save(boardEntity);

        // 파일 저장
        if (boardFiles != null && !boardFiles.isEmpty()) {
            for (MultipartFile boardFile : boardFiles) {
                String originalFileName = boardFile.getOriginalFilename();
                String storageFileName = UUID.randomUUID() + "." + originalFileName;
                String savePath = filePath + storageFileName;

                // 로컬에 파일 저장
                boardFile.transferTo(new File(savePath));

                // 파일 엔티티 저장
                BoardFileEntity boardFileEntity = BoardFileEntity.toBoardFileEntity(savedBoard, originalFileName, storageFileName);
                boardFileRepository.save(boardFileEntity);

            }
        }
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
