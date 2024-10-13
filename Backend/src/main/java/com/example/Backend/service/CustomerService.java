package com.example.Backend.service;

import com.example.Backend.models.Customer;
import com.example.Backend.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepo customerRepository;

    public CustomerService(CustomerRepo customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getCustomersWithoutAccounts() {
        return customerRepository.findCustomersWithoutAccounts();
    }
}
