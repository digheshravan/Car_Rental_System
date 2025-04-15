package com.project.Car_Rental_System.services.payments;

import com.project.Car_Rental_System.dto.PaymentDto;

import java.util.List;

public interface PaymentService {

    PaymentDto createPayment(PaymentDto paymentDto);
    List<PaymentDto> getPaymentsByUserId(Long userId);
    PaymentDto getPaymentById(Long id);
}
