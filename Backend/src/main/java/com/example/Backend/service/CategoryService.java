package com.example.Backend.service;

import com.example.Backend.models.Category;
import com.example.Backend.repository.CategoryRepo;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    private CategoryRepo categoryRepo;

    public CategoryService(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    public Iterable<Category> searchCategoryByName(String categoryName) {
        Iterable<Category> categories = categoryRepo.searchCategoryByName(categoryName);
        return categories;
    }

    public int getCategoryCount() {
        return categoryRepo.countCategories();
    }

}
