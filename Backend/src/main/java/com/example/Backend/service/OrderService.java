package com.example.Backend.service;

import com.example.Backend.Dto.RevenueDTO;
import com.example.Backend.repository.OrderRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private OrderRepo orderRepo;

    public OrderService(OrderRepo orderRepo) {
        this.orderRepo = orderRepo;
    }

    public List<RevenueDTO> getMonthlyRevenue() {
        List<Object[]> results = orderRepo.getMonthlyRevenue();
        List<RevenueDTO> revenues = new ArrayList<>();
        for (Object[] result : results) {
            revenues.add(new RevenueDTO((Integer) result[0], (Double) result[1]));
        }
        return revenues;
    }

    public int getOrdersCount() {
        return orderRepo.countOrders();
    }
}
