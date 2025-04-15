package com.project.Car_Rental_System.controller;

import com.project.Car_Rental_System.dto.AuthenticationRequest;
import com.project.Car_Rental_System.dto.AuthenticationResponse;
import com.project.Car_Rental_System.dto.SignupRequest;
import com.project.Car_Rental_System.dto.UserDto;
import com.project.Car_Rental_System.repository.UserRepository;
import com.project.Car_Rental_System.services.auth.AuthService;
import com.project.Car_Rental_System.services.auth.jwt.UserService;
import com.project.Car_Rental_System.utils.JWTUtil;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import com.project.Car_Rental_System.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    private final JWTUtil jwtUtil;

    private final UserRepository userRepository;

    @PostMapping(value = "/signup", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> signupCustomer(@RequestBody SignupRequest signupRequest) {
        System.out.println("Received Signup Request: " + signupRequest);

        if (signupRequest.getEmail() == null || signupRequest.getPhoneNumber() == null || signupRequest.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("All fields are required.");
        }
        if ("ADMIN".equalsIgnoreCase(signupRequest.getUserRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Cannot assign admin role.");
        }
        if(authService.hasCustomerWithPhoneNumber(signupRequest.getPhoneNumber()))
            return new ResponseEntity<>("Phone number already exists", HttpStatus.NOT_ACCEPTABLE);
        if(authService.hasCustomerWithEmail(signupRequest.getEmail()))
            return new ResponseEntity<>("Email already exists", HttpStatus.NOT_ACCEPTABLE);
        UserDto createdUser = authService.createCustomer(signupRequest);
        if (signupRequest.getUserRole().equalsIgnoreCase("ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Cannot assign admin role");
        }
        if (createdUser == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User not created, please try again later.");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws
            BadCredentialsException,
            DisabledException,
            UsernameNotFoundException {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(),
                    authenticationRequest.getPassword()));
        }catch (BadCredentialsException e){
            throw new BadCredentialsException("Invalid credentials");
        }
        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        System.out.println("Generated JWT Token: " + jwt); // Debugging purpose
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if (optionalUser.isPresent()) {
            authenticationResponse.setJwt(jwt);
            authenticationResponse.setUserId(String.valueOf(optionalUser.get().getId()));
            authenticationResponse.setUserRole(optionalUser.get().getUserRole().name());
            return authenticationResponse;
        }
        throw new UsernameNotFoundException("User not found");
    }
}
