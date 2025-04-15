package com.project.Car_Rental_System.repository;

import com.project.Car_Rental_System.entity.Admin;
import com.project.Car_Rental_System.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUser_UserRole(UserRole userRole);
}
