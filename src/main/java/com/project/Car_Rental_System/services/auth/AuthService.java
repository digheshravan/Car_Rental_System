package com.project.Car_Rental_System.services.auth;

import com.project.Car_Rental_System.dto.SignupRequest;
import com.project.Car_Rental_System.dto.UserDto;

public interface AuthService {

    UserDto createCustomer(SignupRequest signupRequest);

    boolean hasCustomerWithEmail(String email);

    boolean hasCustomerWithPhoneNumber(String phoneNumber);
}
