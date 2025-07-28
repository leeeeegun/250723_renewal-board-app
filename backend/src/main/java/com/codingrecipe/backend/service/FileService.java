package com.codingrecipe.backend.service;

import com.codingrecipe.backend.entity.BoardEntity;
import com.codingrecipe.backend.entity.FileEntity;
import com.codingrecipe.backend.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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

        // 파일 확장자 추출
        String extension = "";
        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex > 0 && dotIndex < originalFileName.length() - 1) {
            extension = originalFileName.substring(dotIndex);
        }

        // 저장될 파일명: UUID + 확장자
        String storedFileName = uuid + extension;

        // fileDir (application.properties에서 주입받은 경로) 사용
        String filePath = fileDir + storedFileName;

        // 파일 저장용 디렉토리가 없으면 생성 (선택 사항이지만 안정성을 위해 권장)
        File directory = new File(fileDir);
        if (!directory.exists()) {
            directory.mkdirs(); // 디렉토리가 없으면 생성
        }

        multipartFile.transferTo(new File(filePath));

        FileEntity fileEntity = new FileEntity();
        fileEntity.setOriginalFileName(originalFileName);
        fileEntity.setStoredFileName(storedFileName);
        fileEntity.setFilePath(filePath); // DB에는 절대 경로 저장
        fileEntity.setBoard(boardEntity);

        return fileRepository.save(fileEntity);
    }
}