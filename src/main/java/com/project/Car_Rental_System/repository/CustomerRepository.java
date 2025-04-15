package com.project.Car_Rental_System.repository;

import com.project.Car_Rental_System.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long>{
}
