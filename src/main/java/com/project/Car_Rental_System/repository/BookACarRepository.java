package com.project.Car_Rental_System.repository;

import com.project.Car_Rental_System.dto.BookACarDto;
import com.project.Car_Rental_System.entity.BookACar;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookACarRepository extends JpaRepository<BookACar,Long> {
    List<BookACar> findAllByUserId(Long userId);
}
