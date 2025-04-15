package com.project.Car_Rental_System.dto;

import com.project.Car_Rental_System.enums.BookCarStatus;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
public class BookACarDto {

    private Long id;

    private LocalDate fromDate;

    private LocalDate toDate;

    private Long days;

    private Long price;

    private BookCarStatus bookCarStatus;

    private Long carId;

    private Long userId;

    private  String username;

    private String email;

    private String brand;

    private MultipartFile image;

    private  byte[] returnedImage;

}
