package com.example.Backend.service;

import com.example.Backend.Dto.MusicalinsDTO;
import com.example.Backend.models.MusicalInstrument;
import com.example.Backend.repository.MusicalInsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class MusicalInsService {

    private final MusicalInsRepo musicalInstrumentRepository;
    private final FileService _fileService;

    @Value("${upload.dir}")
    private String uploadDir;

    @Autowired
    public MusicalInsService(MusicalInsRepo musicalInstrumentRepository, FileService fileService) {
        this.musicalInstrumentRepository = musicalInstrumentRepository;
        _fileService = fileService;
    }

    public MusicalInstrument addProduct(String musicName, float musicPrice, Integer musicQuantity, Integer categoryId, MultipartFile file) throws IOException {
        String fileName = _fileService.saveFile(file);

        MusicalInstrument instrument = new MusicalInstrument();
        instrument.setMusic_name(musicName);
        instrument.setMusic_price(musicPrice);
        instrument.setMusic_quantity(musicQuantity);
        instrument.setMusic_category_id(categoryId);
        instrument.setMusic_img(fileName);

        return musicalInstrumentRepository.save(instrument);
    }

    public MusicalInstrument updateMusical(MusicalinsDTO musical) {
        try {
            MusicalInstrument musicalins = this.musicalInstrumentRepository.findById(musical.getMusic_id()).orElse(null);
            if (musicalins != null) {
                String fileName = musicalins.getMusic_img();

                if (musical.getMusic_Picture() != null && !musical.getMusic_Picture().isEmpty()) {
                    MultipartFile file = musical.getMusic_Picture();
                    _fileService.removeFile(fileName);
                    fileName = _fileService.saveFile(file);
                    musicalins.setMusic_img(fileName);
                }

                musicalins.setMusic_name(musical.getMusic_name());
                musicalins.setMusic_quantity(musical.getMusic_quantity());
                musicalins.setMusic_price(musical.getMusic_price());
                musicalins.setMusic_category_id(musical.getMusic_category_id());

                this.musicalInstrumentRepository.save(musicalins);

                return musicalins;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public int getMusicCount() {
        return musicalInstrumentRepository.countMusic();
    }

    public int checkStock(int music_id) {
        MusicalInstrument instrument = musicalInstrumentRepository.findById(music_id)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại."));

        return instrument.getMusic_quantity(); // Trả về số lượng tồn kho
    }

}
