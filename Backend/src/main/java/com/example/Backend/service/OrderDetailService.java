package com.example.Backend.service;

import com.example.Backend.repository.OrderDetailRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailService {
    @Autowired
    private OrderDetailRepo orderDetailRepo;

    public OrderDetailService(OrderDetailRepo orderDetailRepo) {
        this.orderDetailRepo = orderDetailRepo;
    }
}
