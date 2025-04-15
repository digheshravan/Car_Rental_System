package com.project.Car_Rental_System.dto;

import lombok.Data;

@Data
public class SearchCarDto {

    private String brand;

    private String fuelType;

    private String transmission;

    private String color;
}
