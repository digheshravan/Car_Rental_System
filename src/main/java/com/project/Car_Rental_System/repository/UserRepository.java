package com.project.Car_Rental_System.repository;

import com.project.Car_Rental_System.entity.User;
import com.project.Car_Rental_System.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository <User, Long>{

    Optional<User> findFirstByEmail(String email);

    Optional<User> findByPhoneNumber(String phoneNumber);

    User findByUserRole(UserRole userRole);
}