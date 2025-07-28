package com.codingrecipe.backend.controller;

import com.codingrecipe.backend.entity.BoardEntity;
import com.codingrecipe.backend.service.BoardService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/boards")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    // 게시글 작성
    @PostMapping
    public ResponseEntity<Void> createBoard(
            @ModelAttribute BoardDTO boardDTO,
            @RequestParam(value = "boardFiles", required = false) List<MultipartFile> boardFiles) {
        try {
            boardService.save(boardDTO, boardFiles);
            return new ResponseEntity<>(HttpStatus.CREATED); // 성공 시 201 Created 반환
        } catch (IOException e) {
            e.printStackTrace();
        } return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 실패 시 500 Error 반환
    }

    // 모든 게시글 조회
    @GetMapping
    public ResponseEntity<List<BoardEntity>> getAllBoards() {
        List<BoardEntity> boards = boardService.findAll();
        return ResponseEntity.ok(boards);
    }

    // 단일 게시글 조회
    @GetMapping("/{id}")
    public ResponseEntity<BoardEntity> getBoardById(@PathVariable long id) {
        Optional<BoardEntity> board = boardService.findById(id);
        if (board.isPresent()) {
            boardService.updateHits(id);
            return ResponseEntity.ok(board.get());
        } else {
            return ResponseEntity.noContent().build(); // 204 No Content 반환
        }
    }

    // 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateBoard(@PathVariable Long id, @RequestBody BoardEntity boardEntity) {
        boardEntity.setId(id);
        boardService.update(boardEntity);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable long id) {
        boardService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


//    @PostMapping
//    public ResponseEntity<BoardEntity> createBoard(@RequestBody BoardEntity board) {
//        BoardEntity savedBoard = boardService.save(board);
//        return ResponseEntity.ok(savedBoard);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<BoardEntity>> getBoards() {
//        List<BoardEntity> boards = boardService.findAll();
//        return ResponseEntity.ok(boards);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<BoardEntity> getBoardById(@PathVariable long id) {
//        return boardService.findById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.noContent().build());
//    }
