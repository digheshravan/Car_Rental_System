package com.project.Car_Rental_System.controller;

import com.project.Car_Rental_System.dto.BookACarDto;
import com.project.Car_Rental_System.dto.CarDto;
import com.project.Car_Rental_System.dto.SearchCarDto;
import com.project.Car_Rental_System.entity.Car;
import com.project.Car_Rental_System.services.owner.OwnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController

@RequestMapping("/api/owner")
@RequiredArgsConstructor
public class OwnerController {

    private final OwnerService ownerService;

    @PreAuthorize("hasAuthority('ROLE_OWNER')")
    @PostMapping("/car")
    public ResponseEntity<?> postCar(@ModelAttribute CarDto carDto) {

                boolean success = ownerService.postCar(carDto);
                if (success) {
                    return ResponseEntity.status(HttpStatus.CREATED).build();

                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
                }
    }
    @GetMapping("/cars")
    public ResponseEntity<?> getAllCars(){
        return ResponseEntity.ok(ownerService.getAllCars());
    }
    @DeleteMapping("/car/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id){
        ownerService.deleteCar(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/car/{id}")
    public ResponseEntity<CarDto> getCarById(@PathVariable Long id){
        CarDto carDto = ownerService.getCarById(id);
        return ResponseEntity.ok(carDto);
    }

    @GetMapping("/car/booking")
    public ResponseEntity<List<BookACarDto>> getBookings(){
        return ResponseEntity.ok(ownerService.getBookings());
    }

    @GetMapping("/car/booking/{bookingId}/{status}")
    public ResponseEntity<?> changeBookingStatus(@PathVariable Long bookingId, @PathVariable String status){
        boolean success = ownerService.changeBookingStatus(bookingId,status);
        if (success) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/car/search")
    public ResponseEntity<?> searchCar(@RequestBody SearchCarDto searchCarDto){
        return ResponseEntity.ok(ownerService.searchCar(searchCarDto));
    }

}
