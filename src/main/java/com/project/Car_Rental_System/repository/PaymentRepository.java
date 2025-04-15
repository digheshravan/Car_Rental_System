package com.project.Car_Rental_System.repository;

import com.project.Car_Rental_System.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByUser_Id(Long userId);

}
