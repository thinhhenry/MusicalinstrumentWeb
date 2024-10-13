package com.example.Backend.controller;

import com.example.Backend.Dto.AccountDTO;
import com.example.Backend.Dto.LoginDTO;
import com.example.Backend.models.Account;
import com.example.Backend.models.Customer;
import com.example.Backend.repository.AccountRepo;
import com.example.Backend.repository.CustomerRepo;
import com.example.Backend.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/account")
public class AccountController {
    private AccountRepo accountRepo;
    private AccountService accountService;
    private CustomerRepo customerRepo;

    public AccountController(AccountRepo accountRepo, AccountService accountService, CustomerRepo customerRepo) {
        this.accountRepo = accountRepo;
        this.accountService = accountService;
        this.customerRepo = customerRepo;
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> addOrder(
            @RequestParam("customer_name") String customerName,
            @RequestParam("customer_phone") String customerPhone,
            @RequestParam("customer_address") String customerAddress,
            @RequestParam("username") String userName,
            @RequestParam("password") String passWord
    ) {
        try {

            Customer c = new Customer();
            c.setCustomer_name(customerName);
            c.setCustomer_phone(customerPhone);
            c.setCustomer_address(customerAddress);

            Customer savedCustomer = customerRepo.save(c);

            Account acc = new Account();
            acc.setAccount_id(savedCustomer.getCustomer_id());
            acc.setUsername(userName);
            acc.setPassword(passWord);
            acc.setRole("user");
            acc.setCreate_at(LocalDateTime.now());

            accountRepo.save(acc);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Tài khoan đã được tạo");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Error processing the request"));
        }
    }

    @PostMapping("/checkLogin")
    public ResponseEntity<Account> checkLogin(@RequestBody LoginDTO loginDTO) {
        Optional<Account> accountData = accountRepo.findByUsernameAndPassword(loginDTO.getUsername(), loginDTO.getPassword());
        if (accountData.isPresent()) {
            return new ResponseEntity<>(accountData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getAccountWithUserRole")
    public List<AccountDTO> getAccountWithUserRole() {
        return accountService.getAccountWithUserRole();
    }

    @GetMapping("/getAccountWithAdRole")
    public List<AccountDTO> getAccountWithAdRole() {
        return accountService.getAccountWithAdRole();
    }

    @PutMapping("/{accountId}/ad-role")
    public ResponseEntity<Account> ad_authorization(
            @PathVariable("accountId") int accountId){

        Optional<Account> accOptional = accountRepo.findById(accountId);

        if (accOptional.isPresent()) {
            Account acc = accOptional.get();
            acc.setRole("admin");
            accountRepo.save(acc);
            return ResponseEntity.ok(acc);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{accountId}/us-role")
    public ResponseEntity<Account> us_authorization(
            @PathVariable("accountId") int accountId){

        Optional<Account> accOptional = accountRepo.findById(accountId);

        if (accOptional.isPresent()) {
            Account acc = accOptional.get();
            acc.setRole("user");
            accountRepo.save(acc);
            return ResponseEntity.ok(acc);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchAccByName(@RequestParam String userName) {
        try {
            Iterable<Account> acc = this.accountService.searchAccByName(userName);
            return ResponseEntity.status(HttpStatus.CREATED).body(acc);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Lỗi: " + e.getMessage());
        }
    }

}
