package com.example.Backend.controller;
import com.example.Backend.Dto.OrderDetailDTO;
import com.example.Backend.Dto.RevenueDTO;
import com.example.Backend.models.Customer;
import com.example.Backend.models.OrderDetails;
import com.example.Backend.models.Orders;
import com.example.Backend.repository.CustomerRepo;
import com.example.Backend.repository.OrderDetailRepo;
import com.example.Backend.repository.OrderRepo;
import com.example.Backend.service.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/order")
public class OrderController {
    private OrderRepo orderRepo;
    private OrderDetailRepo orderDetailRepo;
    private OrderService orderService;
    private CustomerRepo customerRepo;

    public OrderController(OrderRepo orderRepo, OrderDetailRepo orderDetails, OrderService orderService, CustomerRepo customerRepo) {
        this.orderRepo = orderRepo;
        this.orderDetailRepo = orderDetails;
        this.orderService = orderService;
        this.customerRepo = customerRepo;
    }

    @GetMapping(path = "/getAll")
    public @ResponseBody Iterable<Orders> getAll_Order() {
        return this.orderRepo.findAll();
    }

    @GetMapping("/by-customer")
    public ResponseEntity<List<Orders>> getOrdersByCustomerId(@RequestParam("customerId") int customerId) {
        List<Orders> orders = orderRepo.findOrdersByCustomerId(customerId);
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> addOrder(
            @RequestParam("order_date") LocalDateTime orderDate,
            @RequestParam("order_total") float orderTotal,
            @RequestParam("customer_name") String customerName,
            @RequestParam("customer_phone") String customerPhone,
            @RequestParam("customer_address") String customerAddress,
            @RequestParam("customer_id") int customerId,
            @RequestParam("orderDetails") String orderDetailsJson
    ) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            OrderDetails[] orderDetails = objectMapper.readValue(orderDetailsJson, OrderDetails[].class);

            Orders order = new Orders();
            order.setOrder_date(orderDate);
            order.setOrder_total(orderTotal);
            order.setCustomer_name(customerName);
            order.setCustomer_phone(customerPhone);
            order.setCustomer_address(customerAddress);
            order.setCustomer_id(customerId);

            Orders savedOrder = orderRepo.save(order);

            for (OrderDetails details : orderDetails) {
                details.setOrder_id(savedOrder.getOrder_id());
                orderDetailRepo.save(details);
            }

            Map<String, String> response = new HashMap<>();
            response.put("message", "Order and details added successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Error processing the request"));
        }
    }

    @PostMapping("/add-without-us")
    public ResponseEntity<Map<String, Object>> addOrder(
            @RequestParam("order_date") LocalDateTime orderDate,
            @RequestParam("order_total") float orderTotal,
            @RequestParam("customer_name") String customerName,
            @RequestParam("customer_phone") String customerPhone,
            @RequestParam("customer_address") String customerAddress,
            @RequestParam("orderDetails") String orderDetailsJson
    ) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            OrderDetails[] orderDetails = objectMapper.readValue(orderDetailsJson, OrderDetails[].class);

            Customer customer = new Customer();
            customer.setCustomer_name(customerName);
            customer.setCustomer_address(customerAddress);

            Customer savedCustomer = customerRepo.save(customer);

            Orders order = new Orders();
            order.setOrder_date(orderDate);
            order.setOrder_total(orderTotal);
            order.setCustomer_name(customerName);
            order.setCustomer_phone(customerPhone);
            order.setCustomer_address(customerAddress);
            order.setCustomer_id(savedCustomer.getCustomer_id());

            Orders savedOrder = orderRepo.save(order);

            for (OrderDetails details : orderDetails) {
                details.setOrder_id(savedOrder.getOrder_id());
                orderDetailRepo.save(details);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Order and details added successfully");
            response.put("order_id", savedOrder.getOrder_id());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Error processing the request"));
        }
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<Orders> updateOrderStatus(
            @PathVariable("orderId") int orderId,
            @RequestParam("order_status") short order_status) {

        Optional<Orders> orderOptional = orderRepo.findById(orderId);

        if (orderOptional.isPresent()) {
            Orders order = orderOptional.get();
            order.setOrder_status(order_status);
            orderRepo.save(order);
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/revenue")
    public ResponseEntity<List<RevenueDTO>> getMonthlyRevenue() {
        List<RevenueDTO> revenueList = orderService.getMonthlyRevenue();
        return new ResponseEntity<>(revenueList, HttpStatus.OK);
    }

    @GetMapping("/revenue-current-month")
    public ResponseEntity<Float> getCurrentMonthRevenue() {
        Float totalRevenue = orderRepo.getCurrentMonthRevenue();
        return ResponseEntity.ok(totalRevenue);
    }

    @GetMapping("/count")
    public int getOrdersCount() {
        return orderService.getOrdersCount();
    }

    @GetMapping("/search")
    public ResponseEntity<List<OrderDetailDTO>> getOrderDetails(@RequestParam("orderId") int orderId) {
        try {
            List<OrderDetailDTO> orderDetails = orderRepo.findOrderDetailsByOrderId(orderId);
            if (orderDetails.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(orderDetails);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
