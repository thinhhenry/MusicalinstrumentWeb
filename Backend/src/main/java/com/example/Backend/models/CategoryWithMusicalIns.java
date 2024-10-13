package com.example.Backend.models;

import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200/")
public class CategoryWithMusicalIns {
    private Category category;
    private List<MusicalInstrument> instruments;

    public CategoryWithMusicalIns() {
    }

    public CategoryWithMusicalIns(Category category, List<MusicalInstrument> instruments) {
        this.category = category;
        this.instruments = instruments;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<MusicalInstrument> getInstruments() {
        return instruments;
    }

    public void setInstruments(List<MusicalInstrument> instruments) {
        this.instruments = instruments;
    }
}
