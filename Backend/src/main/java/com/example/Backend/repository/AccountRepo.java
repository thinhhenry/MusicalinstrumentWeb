package com.example.Backend.repository;

import com.example.Backend.Dto.AccountDTO;
import com.example.Backend.models.Account;
import com.example.Backend.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccountRepo extends JpaRepository<Account, Integer> {
    Optional<Account> findByUsernameAndPassword(String username, String password);
    @Query("SELECT new com.example.Backend.Dto.AccountDTO(c.customer_id, c.customer_name, c.customer_phone, c.customer_address, " +
            "ac.account_id, ac.username, ac.password, ac.create_at, ac.role) " +
            "FROM Customer c JOIN c.accounts ac WHERE ac.role = 'user'")
    List<AccountDTO> findAccountWithUserRole();
    @Query("SELECT new com.example.Backend.Dto.AccountDTO(c.customer_id, c.customer_name, c.customer_phone, c.customer_address, " +
            "ac.account_id, ac.username, ac.password, ac.create_at, ac.role) " +
            "FROM Customer c JOIN c.accounts ac WHERE ac.role IN ('admin', 'sp_admin')")
    List<AccountDTO> findAccountWithAdRole();
    @Query("SELECT a FROM Account a WHERE a.username = :username")
    Iterable<Account> searchAccByName(@Param("username") String userName);
}
