package com.project.Car_Rental_System.dto;

import com.project.Car_Rental_System.enums.PaymentStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PaymentDto {
    private Long id;
    private Double amount;
    private PaymentStatus status;
    private String method;         // e.g., UPI, Card
    private String transactionId;
    private LocalDateTime paymentDate;
    private Long bookingId;
    private Long customerId;
    private Long userId;
}
