package com.example.Backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@CrossOrigin("http://localhost:4200/")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer order_id;

    private LocalDateTime order_date;
    private short order_status;
    private float order_total;
    private String customer_name;
    private String customer_phone;
    private String customer_address;

    @Column(name = "customer_id")
    private int customer_id;
    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id", insertable = false, updatable = false)
    @JsonBackReference
    private Customer customer;
    @JsonManagedReference(value = "orderDetails")
    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
    private List<OrderDetails> order_detail;

    public void setOrder(Orders order){
        this.order_id = order.getOrder_id();
        this.order_date = order.getOrder_date();
        this.order_status = order.getOrder_status();
        this.order_total = order.getOrder_total();
        this.customer_id = order.getCustomer_id();
        this.customer_name = order.getCustomer_name();
        this.customer_phone = order.getCustomer_phone();
        this.customer_address = order.getCustomer_address();
    }

    public Integer getOrder_id() {
        return order_id;
    }

    public void setOrder_id(Integer order_id) {
        this.order_id = order_id;
    }

    public LocalDateTime getOrder_date() {
        return order_date;
    }

    public void setOrder_date(LocalDateTime order_date) {
        this.order_date = order_date;
    }

    public short getOrder_status() {
        return order_status;
    }

    public void setOrder_status(short order_status) {
        this.order_status = order_status;
    }

    public float getOrder_total() {
        return order_total;
    }

    public void setOrder_total(float order_total) {
        this.order_total = order_total;
    }

    public int getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<OrderDetails> getOrder_detail() {
        return order_detail;
    }

    public void setOrder_detail(List<OrderDetails> order_detail) {
        this.order_detail = order_detail;
    }

    public String getCustomer_name() {
        return customer_name;
    }

    public void setCustomer_name(String customer_name) {
        this.customer_name = customer_name;
    }

    public String getCustomer_phone() {
        return customer_phone;
    }

    public void setCustomer_phone(String customer_phone) {
        this.customer_phone = customer_phone;
    }

    public String getCustomer_address() {
        return customer_address;
    }

    public void setCustomer_address(String customer_address) {
        this.customer_address = customer_address;
    }
}
