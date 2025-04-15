package com.project.Car_Rental_System.repository;

import com.project.Car_Rental_System.entity.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
}
