package com.example.todolist.service;

import com.example.todolist.entity.User;
import com.example.todolist.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserInfoService.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.debug("Attempting to load user: {}", username);

        // Tìm user theo email (vì trong UserInfoDetails ta dùng email làm username)
        Optional<User> userDetail = userRepository.findByEmail(username);
        
        // Nếu không tìm thấy theo email, thử tìm theo username
        if (userDetail.isEmpty()) {
            logger.debug("User not found by email, trying username: {}", username);
            userDetail = userRepository.findByUsername(username);
        }
        
        // Nếu vẫn không tìm thấy thì throw exception với message chi tiết hơn
        return userDetail.map(user -> {
            logger.debug("User found successfully: {}", username);
            return new UserInfoDetails(user);
        }).orElseThrow(() -> {
            logger.warn("User not found for username/email: {}", username);
            return new UsernameNotFoundException("Không tìm thấy người dùng với username/email: " + username);
        });
    }
}
