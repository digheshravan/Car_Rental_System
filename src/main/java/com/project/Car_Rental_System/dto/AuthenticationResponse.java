package com.project.Car_Rental_System.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthenticationResponse {

    private String jwt;

    private String UserRole;

    private String userId;

    public AuthenticationResponse(){

    }

}
