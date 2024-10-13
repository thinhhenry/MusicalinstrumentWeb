package com.example.Backend.repository;

import com.example.Backend.models.Category;
import com.example.Backend.models.CategoryWithMusicalIns;
import com.example.Backend.models.MusicalInstrument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MusicalInsRepo extends JpaRepository<MusicalInstrument, Integer> {
    List<MusicalInstrument> findByCategory(Category category);

    @Query("SELECT m FROM MusicalInstrument m WHERE LOWER(m.music_name) LIKE LOWER(CONCAT('%', :music_name, '%'))")
    List<MusicalInstrument> searchMusicByName(@Param("music_name") String musicName);

    @Query("SELECT COUNT(m) FROM MusicalInstrument m")
    int countMusic();
}
