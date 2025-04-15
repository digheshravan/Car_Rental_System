package com.project.Car_Rental_System.dto;

import lombok.Data;

@Data
public class CustomerDto {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
}
