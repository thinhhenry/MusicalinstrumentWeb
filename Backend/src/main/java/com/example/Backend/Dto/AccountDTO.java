package com.example.Backend.Dto;

import java.time.LocalDateTime;

public class AccountDTO {
    private Integer customer_id;
    private String customer_name;
    private String customer_phone;
    private String customer_address;
    private Integer account_id;

    private String username;
    private String password;
    private LocalDateTime create_at;
    private String role;

    public AccountDTO(Integer customer_id, String customer_name, String customer_phone, String customer_address, Integer account_id, String username, String password, LocalDateTime create_at, String role) {
        this.customer_id = customer_id;
        this.customer_name = customer_name;
        this.customer_phone = customer_phone;
        this.customer_address = customer_address;
        this.account_id = account_id;
        this.username = username;
        this.password = password;
        this.create_at = create_at;
        this.role = role;
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
}
