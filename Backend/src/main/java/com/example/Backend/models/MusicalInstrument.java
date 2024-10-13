package com.example.Backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Entity
@Table(name = "music")
@CrossOrigin("http://localhost:4200/")
public class MusicalInstrument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int music_id;
    @Column(nullable = false)
    private String music_name;
    private String music_img;
    private float music_price;
    private int music_quantity;
    @Column(name = "music_category_id")
    private int music_category_id;
    @ManyToOne
    @JoinColumn(name = "music_category_id", referencedColumnName = "category_id", insertable = false, updatable = false)
    @JsonBackReference
    private Category category;
    @OneToMany(mappedBy = "musical")
    @JsonManagedReference(value = "musicalIns")
    private List<OrderDetails> order_detail;

    public void setMusicalInstrument(MusicalInstrument musical) {
        this.music_id = musical.getMusic_id();
        this.music_name = musical.getMusic_name();
        this.music_img = musical.getMusic_img();
        this.music_price = musical.getMusic_price();
        this.music_quantity = musical.getMusic_quantity();
        this.music_category_id = musical.getMusic_category_id();
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<OrderDetails> getOrder_detail() {
        return order_detail;
    }

    public void setOrder_detail(List<OrderDetails> order_detail) {
        this.order_detail = order_detail;
    }
}
