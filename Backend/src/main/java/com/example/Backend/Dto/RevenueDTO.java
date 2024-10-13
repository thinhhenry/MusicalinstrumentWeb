package com.example.Backend.Dto;

public class RevenueDTO {
    private int month;
    private double totalRevenue;

    public RevenueDTO(int month, double totalRevenue) {
        this.month = month;
        this.totalRevenue = totalRevenue;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
