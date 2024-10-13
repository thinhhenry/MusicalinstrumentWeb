package com.example.Backend.controller;

import com.example.Backend.Dto.OrderDetailDTO;
import com.example.Backend.repository.OrderDetailRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/orderDetail")
public class OrderDetailController {

    @Autowired
    private OrderDetailRepo orderDetailRepo;

    public OrderDetailController(OrderDetailRepo orderDetailRepo) {
        this.orderDetailRepo = orderDetailRepo;
    }

    @GetMapping("/{orderId}/details")
    public ResponseEntity<List<OrderDetailDTO>> getOrderDetails(@PathVariable int orderId) {
        List<OrderDetailDTO> orderDetails = orderDetailRepo.findOrderDetailsByOrderId(orderId);
        if (orderDetails.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orderDetails);
    }

}
