package com.example.Backend.repository;

import com.example.Backend.Dto.OrderDetailDTO;
import com.example.Backend.models.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderDetailRepo extends JpaRepository<OrderDetails, Integer> {
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
}
