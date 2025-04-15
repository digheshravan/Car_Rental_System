package com.project.Car_Rental_System.dto;

import lombok.Data;

@Data

public class UserDto {

    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String userRole;

}
