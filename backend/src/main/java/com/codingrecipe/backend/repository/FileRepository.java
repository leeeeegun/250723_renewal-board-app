package com.codingrecipe.backend.repository;

import com.codingrecipe.backend.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
}
