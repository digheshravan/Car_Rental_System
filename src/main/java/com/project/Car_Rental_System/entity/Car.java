package com.project.Car_Rental_System.entity;

import com.project.Car_Rental_System.dto.CarDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Data
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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


    @Column(name = "image", columnDefinition = "longblob")
    private byte[] image;




    public CarDto getCarDto(){
        CarDto carDto = new CarDto();
        carDto.setId(id);
        carDto.setBrand(brand);
        carDto.setModelName(modelName);
        carDto.setRentalPrice(rentalPrice);
        carDto.setColor(color);
        carDto.setTransmission(transmission);
        carDto.setFuelType(fuelType);
        carDto.setCarNumber(carNumber);
        carDto.setReturnedImage(image);
        return carDto;
    }

}
