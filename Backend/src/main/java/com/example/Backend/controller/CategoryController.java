package com.example.Backend.controller;

import com.example.Backend.models.Category;
import com.example.Backend.repository.CategoryRepo;
import com.example.Backend.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/category")
public class CategoryController {
    private CategoryRepo _categoryRepo;
    private CategoryService _categoryService;

    public CategoryController(CategoryRepo _categoryRepo, CategoryService _categoryService) {
        this._categoryRepo = _categoryRepo;
        this._categoryService = _categoryService;
    }

    @GetMapping(path = "/getAll")
    public @ResponseBody Iterable<Category> getAllCategory() {
        return this._categoryRepo.findAll();
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") int id) {
        Optional<Category> categoryData = _categoryRepo.findById(id);

        if (categoryData.isPresent()) {
            return new ResponseEntity<>(categoryData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public @ResponseBody Category addCategory(@RequestBody Category category) {
        this._categoryRepo.save(category);
        return category;
    }

    @PutMapping("/update/{id}")
    public @ResponseBody Category updateCategory(@PathVariable("id") int category_id, @RequestBody Category category) {
        Category existingCategory = this._categoryRepo.findById(category_id).orElseThrow(() -> new RuntimeException("Category not found"));

        existingCategory.setCategory_name(category.getCategory_name());

        this._categoryRepo.save(existingCategory);

        return existingCategory;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (_categoryRepo.findById(id).isPresent()) {
            _categoryRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchCategoryByName(@RequestParam String categoryName) {
        try {
            Iterable<Category> categories = this._categoryService.searchCategoryByName(categoryName);
            return ResponseEntity.status(HttpStatus.CREATED).body(categories);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Lỗi: " + e.getMessage());
        }
    }

    @GetMapping("/count")
    public int getCategoryCount() {
        return _categoryService.getCategoryCount();
    }

    @GetMapping("/check-category")
    public int checkCategory(@RequestParam String categoryName) {
        int count = _categoryRepo.countByCategoryNameIgnoreCase(categoryName);
        return count;
    }

}
