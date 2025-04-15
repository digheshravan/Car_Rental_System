package com.project.Car_Rental_System.controller;

import com.project.Car_Rental_System.dto.PaymentDto;
import com.project.Car_Rental_System.services.payments.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    // Create a payment
    @PostMapping("/create")
    public ResponseEntity<PaymentDto> createPayment(@RequestBody PaymentDto paymentDto) {
        PaymentDto created = paymentService.createPayment(paymentDto);
        if (created != null) {
            return ResponseEntity.ok(created);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    // Get all payments by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentDto>> getPaymentsByUserId(@PathVariable Long userId) {
        List<PaymentDto> payments = paymentService.getPaymentsByUserId(userId);
        return ResponseEntity.ok(payments);
    }

    // Get a single payment by paymentId
    @GetMapping("/{id}")
    public ResponseEntity<PaymentDto> getPaymentById(@PathVariable Long id) {
        PaymentDto paymentDto = paymentService.getPaymentById(id);
        if (paymentDto == null) {
            return ResponseEntity.notFound().build();  // 404 if not found
        }
        return ResponseEntity.ok(paymentDto);  // 200 if found
    }
}
