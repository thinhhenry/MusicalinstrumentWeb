package com.example.Backend.Dto;

import com.example.Backend.models.MusicalInstrument;
import org.springframework.web.multipart.MultipartFile;

public class MusicalinsDTO {
    private int music_id;
    private String music_name;
    private String music_img;
    private float music_price;
    private MultipartFile music_Picture;
    private int music_quantity;
    private int music_category_id;

    public void mapMusical(MusicalInstrument musical) {
        this.setMusic_id(musical.getMusic_id());
        this.setMusic_name(musical.getMusic_name());
        this.setMusic_img(musical.getMusic_img());
        this.setMusic_quantity(musical.getMusic_quantity());
        this.setMusic_price(musical.getMusic_price());
        this.setMusic_category_id(musical.getMusic_category_id());
    }

    public int getMusic_id() {
        return music_id;
    }

    public void setMusic_id(int music_id) {
        this.music_id = music_id;
    }

    public String getMusic_name() {
        return music_name;
    }

    public void setMusic_name(String music_name) {
        this.music_name = music_name;
    }

    public String getMusic_img() {
        return music_img;
    }

    public void setMusic_img(String music_img) {
        this.music_img = music_img;
    }

    public float getMusic_price() {
        return music_price;
    }

    public void setMusic_price(float music_price) {
        this.music_price = music_price;
    }

    public MultipartFile getMusic_Picture() {
        return music_Picture;
    }

    public void setMusic_Picture(MultipartFile music_Picture) {
        this.music_Picture = music_Picture;
    }

    public int getMusic_quantity() {
        return music_quantity;
    }

    public void setMusic_quantity(int music_quantity) {
        this.music_quantity = music_quantity;
    }

    public int getMusic_category_id() {
        return music_category_id;
    }

    public void setMusic_category_id(int music_category_id) {
        this.music_category_id = music_category_id;
    }

}
