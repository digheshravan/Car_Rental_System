package com.project.Car_Rental_System.dto;

import jakarta.annotation.sql.DataSourceDefinition;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class CarDto {
    private Long id;

    private String brand;

    private String modelName;

    private String fuelType;

    private String transmission;

    private String color;

    private String modelYear;

    private Long rentalPrice;

    private String carNumber;

    private String capacity;

    private MultipartFile image;

    private  byte[] returnedImage;
}
