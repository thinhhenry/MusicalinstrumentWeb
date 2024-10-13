package com.example.Backend.repository;

import com.example.Backend.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepo extends JpaRepository<Customer, Integer> {
    @Query("SELECT c FROM Customer c LEFT JOIN c.accounts ac WHERE ac IS NULL")
    List<Customer> findCustomersWithoutAccounts();
}
