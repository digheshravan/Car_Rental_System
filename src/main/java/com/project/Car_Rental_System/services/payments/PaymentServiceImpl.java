package com.project.Car_Rental_System.services.payments;

import com.project.Car_Rental_System.dto.PaymentDto;
import com.project.Car_Rental_System.entity.BookACar;
import com.project.Car_Rental_System.entity.Customer;
import com.project.Car_Rental_System.entity.Payment;
import com.project.Car_Rental_System.entity.User;
import com.project.Car_Rental_System.repository.BookACarRepository;
import com.project.Car_Rental_System.repository.CustomerRepository;
import com.project.Car_Rental_System.repository.PaymentRepository;
import com.project.Car_Rental_System.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final BookACarRepository bookACarRepository;

    @Override
    public PaymentDto createPayment(PaymentDto paymentDto) {
        Optional<User> userOpt = userRepository.findById(paymentDto.getUserId());
        Optional<Customer> customerOpt = customerRepository.findById(paymentDto.getCustomerId());
        Optional<BookACar> bookingOpt = bookACarRepository.findById(paymentDto.getBookingId());

        if (userOpt.isPresent() && customerOpt.isPresent() && bookingOpt.isPresent()) {
            Payment payment = new Payment();
            payment.setAmount(paymentDto.getAmount());
            payment.setMethod(paymentDto.getMethod());
            payment.setStatus(paymentDto.getStatus());
            payment.setTransactionId(paymentDto.getTransactionId());
            payment.setPaymentDate(LocalDateTime.now());
            payment.setUser(userOpt.get());
            payment.setCustomer(customerOpt.get());
            payment.setBooking(bookingOpt.get());

            payment = paymentRepository.save(payment);
            return mapToDto(payment);
        }

        return null;
    }

    @Override
    public List<PaymentDto> getPaymentsByUserId(Long userId) {
        return paymentRepository.findByUser_Id(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public PaymentDto getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id " + id));
        return mapToDto(payment);
    }

    private PaymentDto mapToDto(Payment payment) {
        PaymentDto dto = new PaymentDto();
        dto.setId(payment.getId());
        dto.setAmount(payment.getAmount());
        dto.setStatus(payment.getStatus());
        dto.setMethod(payment.getMethod());
        dto.setTransactionId(payment.getTransactionId());
        dto.setPaymentDate(payment.getPaymentDate());
        dto.setUserId(payment.getUser().getId());
        dto.setCustomerId(payment.getCustomer().getId());
        dto.setBookingId(payment.getBooking().getId());
        return dto;
    }
}
