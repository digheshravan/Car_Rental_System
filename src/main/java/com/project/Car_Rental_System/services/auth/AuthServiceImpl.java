package com.project.Car_Rental_System.services.auth;

import com.project.Car_Rental_System.dto.CustomerDto;
import com.project.Car_Rental_System.dto.OwnerDto;
import com.project.Car_Rental_System.dto.SignupRequest;
import com.project.Car_Rental_System.dto.UserDto;
import com.project.Car_Rental_System.entity.Admin;
import com.project.Car_Rental_System.entity.Customer;
import com.project.Car_Rental_System.entity.Owner;
import com.project.Car_Rental_System.entity.User;
import com.project.Car_Rental_System.enums.UserRole;
import com.project.Car_Rental_System.repository.AdminRepository;
import com.project.Car_Rental_System.repository.CustomerRepository;
import com.project.Car_Rental_System.repository.OwnerRepository;
import com.project.Car_Rental_System.repository.UserRepository;
import com.project.Car_Rental_System.services.customer.CustomerService;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Getter
@Setter
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final OwnerRepository ownerRepository;
    private final AdminRepository adminRepository;

//    @PostConstruct
//    public void createOwnerAccount(){
//        User ownerAccount = userRepository.finByUserRole(UserRole.OWNER);
//        if(ownerAccount == null){
//            User newOwnerAccount = new User();
//            newOwnerAccount.setName("Owner");
//            newOwnerAccount.setEmail("<EMAIL>");
//            newOwnerAccount.setPhoneNumber("<PHONE NUMBER>");
//            newOwnerAccount.setPassword(new BCryptPasswordEncoder().encode("<PASSWORD>"));
//            newOwnerAccount.setUserRole(UserRole.OWNER);
//            userRepository.save(newOwnerAccount);
//            System.out.println("Owner Account Created");
//        }
//    }
    @PostConstruct
    public void createAdminAccount(){
        Admin adminAccount = adminRepository.findByUser_UserRole(UserRole.ADMIN);
        if(adminAccount == null){
            User newAdminUser = new User();
            newAdminUser.setName("Admin");
            newAdminUser.setEmail("admin@test.com");
            newAdminUser.setPhoneNumber("1234567890");
            newAdminUser.setPassword(new BCryptPasswordEncoder().encode("admin"));
            newAdminUser.setUserRole(UserRole.ADMIN);
            userRepository.save(newAdminUser);

            Admin newAdmin = new Admin();
            newAdmin.setName(newAdminUser.getName());
            newAdmin.setEmail(newAdminUser.getEmail());
            newAdmin.setPhoneNumber(newAdminUser.getPhoneNumber());
            newAdmin.setUser(newAdminUser);
            adminRepository.save(newAdmin);
            System.out.println("Admin Account Created in Both Tables with Same ID");
        }
    }
    @Override
    public UserDto createCustomer(SignupRequest signupRequest) {
        if (hasCustomerWithEmail(signupRequest.getEmail())) {
            throw new IllegalArgumentException("❌ Email is already registered.");
        }
        if (hasCustomerWithPhoneNumber(signupRequest.getPhoneNumber())) {
            throw new IllegalArgumentException("❌ Phone number is already registered.");
        }
        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPhoneNumber(signupRequest.getPhoneNumber());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setUserRole(UserRole.valueOf(signupRequest.getUserRole()));
        User createduser = userRepository.save(user);

        if (user.getUserRole() == UserRole.CUSTOMER) {
            Customer customer = new Customer();
            customer.setUser(createduser);
            customer.setName(signupRequest.getName());
            customer.setEmail(signupRequest.getEmail());
            customer.setPhoneNumber(signupRequest.getPhoneNumber());
            customerRepository.save(customer);
        }
        if (user.getUserRole() == UserRole.OWNER) {
            Owner owner = new Owner();
            owner.setUser(createduser);
            owner.setName(signupRequest.getName());
            owner.setEmail(signupRequest.getEmail());
            owner.setPhoneNumber(signupRequest.getPhoneNumber());
            ownerRepository.save(owner);
        }
        UserDto userDto = new UserDto();
        userDto.setId(createduser.getId());
        return userDto;
    }

    @Override
    public boolean hasCustomerWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }

    @Override
    public boolean hasCustomerWithPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber).isPresent();
    }

}
