package com.example.Backend.Dto;


import java.time.LocalDateTime;

public class OrderDetailDTO {
    private int orderId;
    private LocalDateTime orderDate;
    private short orderStatus;
    private float orderTotal;
    private String customerName;
    private String customerPhone;
    private String customerAddress;

    private int orderDetailsId;
    private int orderDetailsQuantity;
    private float orderDetailsPrice;
    private float totalPrice;
    private String musicName;
    private String musicImg;

    public OrderDetailDTO(int orderId, LocalDateTime orderDate, short orderStatus, float orderTotal, String customerName, String customerPhone, String customerAddress, int orderDetailsId, int orderDetailsQuantity, float orderDetailsPrice, float totalPrice, String musicName, String musicImg) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.orderStatus = orderStatus;
        this.orderTotal = orderTotal;
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.customerAddress = customerAddress;
        this.orderDetailsId = orderDetailsId;
        this.orderDetailsQuantity = orderDetailsQuantity;
        this.orderDetailsPrice = orderDetailsPrice;
        this.totalPrice = totalPrice;
        this.musicName = musicName;
        this.musicImg = musicImg;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public short getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(short orderStatus) {
        this.orderStatus = orderStatus;
    }

    public float getOrderTotal() {
        return orderTotal;
    }

    public void setOrderTotal(float orderTotal) {
        this.orderTotal = orderTotal;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public int getOrderDetailsId() {
        return orderDetailsId;
    }

    public void setOrderDetailsId(int orderDetailsId) {
        this.orderDetailsId = orderDetailsId;
    }

    public int getOrderDetailsQuantity() {
        return orderDetailsQuantity;
    }

    public void setOrderDetailsQuantity(int orderDetailsQuantity) {
        this.orderDetailsQuantity = orderDetailsQuantity;
    }

    public float getOrderDetailsPrice() {
        return orderDetailsPrice;
    }

    public void setOrderDetailsPrice(float orderDetailsPrice) {
        this.orderDetailsPrice = orderDetailsPrice;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getMusicName() {
        return musicName;
    }

    public void setMusicName(String musicName) {
        this.musicName = musicName;
    }

    public String getMusicImg() {
        return musicImg;
    }

    public void setMusicImg(String musicImg) {
        this.musicImg = musicImg;
    }
}

