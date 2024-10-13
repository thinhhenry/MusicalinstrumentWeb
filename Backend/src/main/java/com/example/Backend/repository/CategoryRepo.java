package com.example.Backend.repository;

import com.example.Backend.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface CategoryRepo extends JpaRepository<Category, Integer> {
    @Query("SELECT t FROM Category t WHERE LOWER(t.category_name) LIKE LOWER(CONCAT('%', :category_name, '%'))")
    Iterable<Category> searchCategoryByName(@Param("category_name") String categoryName);

    @Query("SELECT COUNT(c) FROM Category c")
    int countCategories();

    @Query("SELECT COUNT(c) FROM Category c WHERE LOWER(c.category_name) = LOWER(:categoryName)")
    int countByCategoryNameIgnoreCase(String categoryName);
}
