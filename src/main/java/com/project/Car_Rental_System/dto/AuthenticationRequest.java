package com.project.Car_Rental_System.dto;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String email;

    private String password;
}
