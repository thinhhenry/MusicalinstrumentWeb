package com.example.Backend.Dto;

public class CategoryDTO {
    private int category_id;
    private int category_name;

    public CategoryDTO(int category_id, int category_name) {
        this.category_id = category_id;
        this.category_name = category_name;
    }

    public int getCategory_id() {
        return category_id;
    }

    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

    public int getCategory_name() {
        return category_name;
    }

    public void setCategory_name(int category_name) {
        this.category_name = category_name;
    }
}

