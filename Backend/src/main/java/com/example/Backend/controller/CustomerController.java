package com.example.Backend.controller;

import com.example.Backend.models.Customer;
import com.example.Backend.repository.CustomerRepo;
import com.example.Backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    private CustomerRepo customerRepo;
    @Autowired
    private CustomerService customerService;

    public CustomerController(CustomerRepo customerRepo, CustomerService customerService) {
        this.customerRepo = customerRepo;
        this.customerService = customerService;
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable("id") int id) {
        Optional<Customer> categoryData = customerRepo.findById(id);

        if (categoryData.isPresent()) {
            return new ResponseEntity<>(categoryData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getCustomerWithoutAcc")
    public List<Customer> getCustomersWithoutAccounts() {
        return customerService.getCustomersWithoutAccounts();
    }
}
