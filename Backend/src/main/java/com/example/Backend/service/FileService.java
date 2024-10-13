package com.example.Backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileService {
    private final String imagePath = "src/main/resources/static/uploads";

    @Value("${upload.dir}")
    private String uploadDir;

    public String saveFile(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        Files.write(filePath, file.getBytes());

        return fileName;
    }

    public void removeFile(String fileName) throws Exception {
        try {
            Files.deleteIfExists(Paths.get(imagePath, fileName));
        } catch (IOException e) {
            e.printStackTrace();
            throw new Exception("Lỗi khi xóa tệp: " + e.getMessage());
        }
    }
}

