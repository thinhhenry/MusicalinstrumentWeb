package com.example.Backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customer_id;
    private String customer_name;
    private String customer_phone;
    private String customer_address;
    @OneToMany(mappedBy = "customer")
    @JsonManagedReference
    private List<Orders> orders;
    @OneToMany(mappedBy = "customer")
    @JsonManagedReference
    private List<Account> accounts;

    public void setCustomer(Customer customer) {
        this.customer_id = customer.getCustomer_id();
        this.customer_phone = customer.getCustomer_phone();
        this.customer_name = customer.getCustomer_name();
        this.customer_address = customer.getCustomer_address();
    }

    public Integer getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(Integer customer_id) {
        this.customer_id = customer_id;
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

    public List<Orders> getOrders() {
        return orders;
    }

    public void setOrders(List<Orders> orders) {
        this.orders = orders;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }
}
