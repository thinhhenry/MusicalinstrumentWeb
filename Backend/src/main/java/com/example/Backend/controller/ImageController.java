package com.example.Backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class ImageController {
    @Value("${upload.dir}")
    private String uploadDir;

    @GetMapping("/uploads/{fileName:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
        Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();
        Resource resource = new FileSystemResource(filePath.toFile());

        return ResponseEntity.ok()
                .header(HttpHeaders.CACHE_CONTROL, "no-cache, no-store, must-revalidate") // Không cache
                .header(HttpHeaders.PRAGMA, "no-cache") // Cho các trình duyệt cũ
                .header(HttpHeaders.EXPIRES, "0") // Không lưu cache
                .body(resource);
    }
}
