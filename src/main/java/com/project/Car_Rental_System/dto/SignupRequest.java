package com.project.Car_Rental_System.dto;

import lombok.Data;

@Data
public class SignupRequest {

    private String email;
    private String name;
    private String password;
    private String phoneNumber;
    private String userRole;
}
