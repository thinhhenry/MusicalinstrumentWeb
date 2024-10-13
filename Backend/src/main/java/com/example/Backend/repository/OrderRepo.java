package com.example.Backend.repository;

import com.example.Backend.Dto.OrderDetailDTO;
import com.example.Backend.models.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepo extends JpaRepository<Orders, Integer> {
    @Query("SELECT EXTRACT(MONTH FROM o.order_date) AS month, SUM(o.order_total) AS totalRevenue " +
            "FROM Orders o " +
            "GROUP BY EXTRACT(MONTH FROM o.order_date) " +
            "ORDER BY EXTRACT(MONTH FROM o.order_date)")
    List<Object[]> getMonthlyRevenue();

    @Query("SELECT SUM(o.order_total) AS totalRevenue " +
            "FROM Orders o " +
            "WHERE EXTRACT(MONTH FROM o.order_date) = EXTRACT(MONTH FROM CURRENT_DATE) " +
            "AND EXTRACT(YEAR FROM o.order_date) = EXTRACT(YEAR FROM CURRENT_DATE)")
    float getCurrentMonthRevenue();

    @Query("SELECT COUNT(o) FROM Orders o")
    int countOrders();

    @Query("SELECT new com.example.Backend.Dto.OrderDetailDTO(o.order_id, o.order_date, o.order_status, o.order_total, "
            + "o.customer_name, o.customer_phone, o.customer_address, "
            + "od.order_details_id, od.order_details_quantity, od.order_details_price, "
            + "od.order_details_quantity * od.order_details_price as totalPrice, "
            + "m.music_name, m.music_img) "
            + "FROM Orders o "
            + "JOIN o.order_detail od "
            + "JOIN od.musical m "
            + "WHERE o.order_id = :orderId")
    List<OrderDetailDTO> findOrderDetailsByOrderId(@Param("orderId") int orderId);

    @Query("SELECT o FROM Orders o WHERE o.customer_id = :customerId")
    List<Orders> findOrdersByCustomerId(@Param("customerId") int customerId);


}
