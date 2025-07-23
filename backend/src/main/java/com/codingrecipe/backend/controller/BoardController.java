package com.codingrecipe.backend.controller;

import com.codingrecipe.backend.entity.BoardEntity;
import com.codingrecipe.backend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/boards")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<BoardEntity> createBoard(@RequestBody BoardEntity board) {
        BoardEntity savedBoard = boardService.save(board);
        return ResponseEntity.ok(savedBoard);
    }

    @GetMapping
    public ResponseEntity<List<BoardEntity>> getBoards() {
        List<BoardEntity> boards = boardService.findAll();
        return ResponseEntity.ok(boards);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardEntity> getBoardById(@PathVariable long id) {
        return boardService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }
}
