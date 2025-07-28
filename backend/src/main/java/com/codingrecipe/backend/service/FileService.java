package com.codingrecipe.backend.service;

import com.codingrecipe.backend.entity.BoardEntity;
import com.codingrecipe.backend.entity.FileEntity;
import com.codingrecipe.backend.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    @Value("${file.dir}")
    private String fileDir;

    private final FileRepository fileRepository;

    public FileEntity saveFile(MultipartFile multipartFile, BoardEntity boardEntity) throws IOException {
    String originalFileName = multipartFile.getOriginalFilename();
    String uuid = UUID.randomUUID().toString();
    String storedFileName = uuid + "_" + originalFileName;
    String filePath = fileDir + storedFileName;

    multipartFile.transferTo(new File(filePath));

    FileEntity fileEntity = new FileEntity();
    fileEntity.setOriginalFileName(originalFileName);
    fileEntity.setStoredFileName(storedFileName);
    fileEntity.setFilePath(filePath);
    fileEntity.setBoard(boardEntity);

    return fileRepository.save(fileEntity);
}
}
