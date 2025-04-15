package com.project.Car_Rental_System.services.admin;

import com.project.Car_Rental_System.dto.AdminDto;
import com.project.Car_Rental_System.entity.Admin;
import com.project.Car_Rental_System.repository.AdminRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;


}
