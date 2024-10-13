package com.example.Backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Entity
@Table(name = "category")
@CrossOrigin("http://localhost:4200/")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int category_id;
    @Column(name = "category_name", nullable = false)
    private String category_name;
    @OneToMany(mappedBy = "category")
    @JsonManagedReference
    private List<MusicalInstrument> musicalInstruments;

    public int getCategory_id() {
        return category_id;
    }

    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

    public String getCategory_name() {
        return category_name;
    }

    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }

    public List<MusicalInstrument> getMusicalInstruments() {
        return musicalInstruments;
    }

    public void setMusicalInstruments(List<MusicalInstrument> musicalInstruments) {
        this.musicalInstruments = musicalInstruments;
    }

    public void setCategory(Category category) {
        this.category_id = category.getCategory_id();
        this.category_name = category.getCategory_name();
    }
}
