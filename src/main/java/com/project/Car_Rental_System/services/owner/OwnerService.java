package com.project.Car_Rental_System.services.owner;

import com.project.Car_Rental_System.dto.BookACarDto;
import com.project.Car_Rental_System.dto.CarDto;
import com.project.Car_Rental_System.dto.CarDtoListDto;
import com.project.Car_Rental_System.dto.SearchCarDto;
import com.project.Car_Rental_System.entity.Car;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface OwnerService {

    boolean postCar(CarDto carDto);

    List<CarDto> getAllCars();

    void deleteCar(Long id);

    CarDto getCarById(Long id);

    List<BookACarDto> getBookings();

    boolean changeBookingStatus(Long bookingId,String status);

    CarDtoListDto searchCar(SearchCarDto searchCarDto);
}
