package com.example.Backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;

@Entity
@Table(name = "account")
@CrossOrigin("http://localhost:4200/")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer account_id;

    private String username;
    private String password;
    private LocalDateTime create_at;
    private String role;
    @Column(name = "customer_id")
    private int customer_id;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id", insertable = false, updatable = false)
    @JsonBackReference
    private Customer customer;

    public void setAccount(Account account) {
        this.account_id = account.getAccount_id();
        this.username = account.getUsername();
        this.password = account.getPassword();
        this.create_at = account.getCreate_at();
        this.role = account.getRole();
        this.customer_id = account.getCustomer_id();
    }

    public Integer getAccount_id() {
        return account_id;
    }

    public void setAccount_id(Integer account_id) {
        this.account_id = account_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCreate_at() {
        return create_at;
    }

    public void setCreate_at(LocalDateTime create_at) {
        this.create_at = create_at;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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
}
