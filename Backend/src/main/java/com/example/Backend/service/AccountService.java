package com.example.Backend.service;

import com.example.Backend.Dto.AccountDTO;
import com.example.Backend.models.Account;
import com.example.Backend.models.Category;
import com.example.Backend.repository.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    @Autowired
    private AccountRepo accountRepo;

    public AccountService(AccountRepo accountRepo) {
        this.accountRepo = accountRepo;
    }

    public List<AccountDTO> getAccountWithUserRole() {
        return accountRepo.findAccountWithUserRole();
    }

    public List<AccountDTO> getAccountWithAdRole() {
        return accountRepo.findAccountWithAdRole();
    }

    public Iterable<Account> searchAccByName(String userName) {
        Iterable<Account> acc = accountRepo.searchAccByName(userName);
        return acc;
    }

}
