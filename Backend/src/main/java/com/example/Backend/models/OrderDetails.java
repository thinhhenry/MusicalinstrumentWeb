package com.example.Backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@Entity
@Table(name = "order_details")
@CrossOrigin("http://localhost:4200/")
public class OrderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int order_details_id;
    private int order_details_quantity;
    private float order_details_price;
    @Column(name = "order_id")
    private int order_id;
    @Column(name = "music_id")
    private int music_id;
    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "order_id", insertable = false, updatable = false)
    @JsonBackReference(value = "orderDetails")
    private Orders orders;
    @ManyToOne
    @JoinColumn(name = "music_id", referencedColumnName = "music_id", insertable = false, updatable = false)
    @JsonBackReference(value = "musicalIns")
    private MusicalInstrument musical;

    public void setOrderDetails(OrderDetails order_d) {
        this.order_details_id = order_d.getOrder_details_id();
        this.order_details_quantity = order_d.getOrder_details_quantity();
        this.order_details_price = order_d.getOrder_details_price();
        this.order_id = order_d.getOrder_id();
        this.music_id = order_d.getMusic_id();
    }

    public Integer getOrder_details_id() {
        return order_details_id;
    }

    public void setOrder_details_id(Integer order_details_id) {
        this.order_details_id = order_details_id;
    }

    public int getOrder_details_quantity() {
        return order_details_quantity;
    }

    public void setOrder_details_quantity(int order_details_quantity) {
        this.order_details_quantity = order_details_quantity;
    }

    public float getOrder_details_price() {
        return order_details_price;
    }

    public void setOrder_details_price(float order_details_price) {
        this.order_details_price = order_details_price;
    }

    public int getOrder_id() {
        return order_id;
    }

    public void setOrder_id(int order_id) {
        this.order_id = order_id;
    }

    public int getMusic_id() {
        return music_id;
    }

    public void setMusic_id(int music_id) {
        this.music_id = music_id;
    }

    public Orders getOrders() {
        return orders;
    }

    public void setOrders(Orders orders) {
        this.orders = orders;
    }

    public MusicalInstrument getMusical() {
        return musical;
    }

    public void setMusical(MusicalInstrument musical) {
        this.musical = musical;
    }
}
