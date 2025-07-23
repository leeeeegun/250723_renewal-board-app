package com.codingrecipe.backend.service;

import com.codingrecipe.backend.entity.BoardEntity;
import com.codingrecipe.backend.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public BoardEntity save(BoardEntity boardEntity) {
        return boardRepository.save(boardEntity);
    }

    public List<BoardEntity> findAll() {
        return boardRepository.findAll();
    }

    public Optional<BoardEntity> findById(long id) {
        return boardRepository.findById(id);
    }

    public void deleteById(long id) {
        boardRepository.deleteById(id);
    }
}
