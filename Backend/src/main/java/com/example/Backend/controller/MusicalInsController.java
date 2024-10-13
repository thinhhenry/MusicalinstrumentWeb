package com.example.Backend.controller;

import com.example.Backend.Dto.MusicalinsDTO;
import com.example.Backend.models.Category;
import com.example.Backend.models.CategoryWithMusicalIns;
import com.example.Backend.models.MusicalInstrument;
import com.example.Backend.repository.CategoryRepo;
import com.example.Backend.repository.MusicalInsRepo;
import com.example.Backend.service.FileService;
import com.example.Backend.service.MusicalInsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/music")
public class MusicalInsController {
    private MusicalInsRepo _musicalInsRepo;
    private final MusicalInsService musicalInstrumentService;
    private final FileService fileService;

    @Value("${upload.dir}")
    private String uploadDir;

    public MusicalInsController(MusicalInsRepo musicalInsRepo, MusicalInsService musicalInstrumentService, CategoryRepo categoryRepo, FileService fileService) {
        this._musicalInsRepo = musicalInsRepo;
        this.musicalInstrumentService = musicalInstrumentService;
        this.fileService = fileService;
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<MusicalInstrument> getCategoryById(@PathVariable("id") int id) {
        Optional<MusicalInstrument> musicalData = _musicalInsRepo.findById(id);

        if (musicalData.isPresent()) {
            return new ResponseEntity<>(musicalData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getAll")
    public @ResponseBody List<CategoryWithMusicalIns> getCategoriesWithInstruments() {
        List<MusicalInstrument> musicalInstruments = _musicalInsRepo.findAll();

        Map<Category, List<MusicalInstrument>> categoryInstrumentMap = new HashMap<>();

        for (MusicalInstrument instrument : musicalInstruments) {
            Category category = instrument.getCategory();

            if (!categoryInstrumentMap.containsKey(category)) {
                categoryInstrumentMap.put(category, new ArrayList<>());
            }
            categoryInstrumentMap.get(category).add(instrument);
        }

        List<CategoryWithMusicalIns> result = new ArrayList<>();
        for (Map.Entry<Category, List<MusicalInstrument>> entry : categoryInstrumentMap.entrySet()) {
            result.add(new CategoryWithMusicalIns(entry.getKey(), entry.getValue()));
        }

        return result;
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> addProduct(
            @RequestParam("music_name") String musicName,
            @RequestParam("music_price") float musicPrice,
            @RequestParam("music_quantity") Integer musicQuantity,
            @RequestParam("music_category_id") Integer musicCategoryId,
            @RequestParam("music_img") MultipartFile file) {
        try {
            musicalInstrumentService.addProduct(musicName, musicPrice, musicQuantity, musicCategoryId, file);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Sản phẩm đã được thêm thành công!");

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Lỗi khi thêm sản phẩm: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateBook(@ModelAttribute MusicalinsDTO musical) {
        return ResponseEntity.ok(this.musicalInstrumentService.updateMusical(musical));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        Optional<MusicalInstrument> musicalInstrument = _musicalInsRepo.findById(id);

        if (musicalInstrument.isPresent()) {

            String fileName = musicalInstrument.get().getMusic_img();

            _musicalInsRepo.deleteById(id);

            try {
                fileService.removeFile(fileName);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }

            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<CategoryWithMusicalIns> searchMusicByName(@RequestParam("musicName") String musicName) {
        List<MusicalInstrument> instruments = _musicalInsRepo.searchMusicByName(musicName);

        Map<Category, List<MusicalInstrument>> categoryMap = new HashMap<>();

        for (MusicalInstrument instrument : instruments) {
            Category category = instrument.getCategory();

            if (categoryMap.containsKey(category)) {
                categoryMap.get(category).add(instrument);
            } else {
                List<MusicalInstrument> newInstrumentList = new ArrayList<>();
                newInstrumentList.add(instrument);
                categoryMap.put(category, newInstrumentList);
            }
        }

        List<CategoryWithMusicalIns> result = new ArrayList<>();
        for (Map.Entry<Category, List<MusicalInstrument>> entry : categoryMap.entrySet()) {
            CategoryWithMusicalIns dto = new CategoryWithMusicalIns();
            dto.setCategory(entry.getKey());
            dto.setInstruments(entry.getValue());
            result.add(dto);
        }

        return result;
    }

    @GetMapping("/count")
    public int getMusicCount() {
        return musicalInstrumentService.getMusicCount();
    }

    @GetMapping("/check-stock/{music_id}/{requested_quantity}")
    public ResponseEntity<Map<String, Object>> checkStock(@PathVariable int music_id, @PathVariable int requested_quantity) {
        int stockQuantity = musicalInstrumentService.checkStock(music_id);

        Map<String, Object> response = new HashMap<>();

        if (requested_quantity > stockQuantity) {
            response.put("error", "Số lượng yêu cầu vượt quá số lượng tồn kho.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        response.put("message", "Số lượng yêu cầu hợp lệ.");
        return ResponseEntity.ok(response);
    }

}
