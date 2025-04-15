package com.project.Car_Rental_System.services.owner;

import com.project.Car_Rental_System.dto.BookACarDto;
import com.project.Car_Rental_System.dto.CarDto;
import com.project.Car_Rental_System.dto.CarDtoListDto;
import com.project.Car_Rental_System.dto.SearchCarDto;
import com.project.Car_Rental_System.entity.BookACar;
import com.project.Car_Rental_System.entity.Car;
import com.project.Car_Rental_System.enums.BookCarStatus;
import com.project.Car_Rental_System.repository.BookACarRepository;
import com.project.Car_Rental_System.repository.CarRepository;
import com.project.Car_Rental_System.repository.OwnerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class OwnerServiceImpl implements OwnerService {

    private final CarRepository carRepository;

    private final OwnerRepository ownerRepository;

    private  final BookACarRepository bookACarRepository;

    @Override
    public boolean postCar(CarDto carDto) {
        try {
            Car car = new Car();
            car.setBrand(carDto.getBrand());
            car.setModelName(carDto.getModelName());
            car.setFuelType(carDto.getFuelType());
            car.setTransmission(carDto.getTransmission());
            car.setColor(carDto.getColor());
            car.setModelYear(carDto.getModelYear());
            car.setRentalPrice(carDto.getRentalPrice());
            car.setCarNumber(carDto.getCarNumber());
            car.setCapacity(carDto.getCapacity());
            car.setImage(carDto.getImage().getBytes());
            carRepository.save(car);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<CarDto> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());

    }

    @Override
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    @Override
    public CarDto getCarById(Long id) {
        Optional<Car> optionalCar = carRepository.findById(id);
        return optionalCar.map(Car::getCarDto).orElse(null);
    }

    @Override
    public List<BookACarDto> getBookings() {
        return bookACarRepository.findAll().stream().map(BookACar::getBookACarDto).collect(Collectors.toList());
    }

    @Override
    public boolean changeBookingStatus(Long bookingId, String status) {
        Optional<BookACar> optionalBookACar = bookACarRepository.findById(bookingId);
        if (optionalBookACar.isPresent()){
            BookACar existingBookACar = optionalBookACar.get();
            if (Objects.equals(status,"Approve"))
                existingBookACar.setBookCarStatus(BookCarStatus.APPROVED);
            else
                existingBookACar.setBookCarStatus(BookCarStatus.REJECTED);
            bookACarRepository.save(existingBookACar);
            return true;
        }
        return false;
    }

    @Override
    public CarDtoListDto searchCar(SearchCarDto searchCarDto) {
        Car car = new Car();
        car.setBrand(searchCarDto.getBrand());
        car.setFuelType(searchCarDto.getFuelType());
        car.setTransmission(searchCarDto.getTransmission());
        car.setColor(searchCarDto.getColor());
        ExampleMatcher exampleMatcher = ExampleMatcher.matchingAll()
                .withMatcher("brand", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("fuelType", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("transmission", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("color",ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());
        Example<Car> carExample = Example.of(car,exampleMatcher);
        List<Car> carList = carRepository.findAll(carExample);
        CarDtoListDto carDtoListDto = new CarDtoListDto();
        carDtoListDto.setCarDtoList(carList.stream().map(Car::getCarDto).collect(Collectors.toList()));
        return carDtoListDto;
    }


}
