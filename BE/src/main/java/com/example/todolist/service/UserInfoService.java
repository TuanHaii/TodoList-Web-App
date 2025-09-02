package com.example.todolist.service;

import com.example.todolist.entity.User;
import com.example.todolist.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Tìm user theo email (vì trong UserInfoDetails ta dùng email làm username)
        Optional<User> userDetail = userRepository.findByEmail(username);
        
        // Nếu không tìm thấy theo email, thử tìm theo username
        if (userDetail.isEmpty()) {
            userDetail = userRepository.findByUsername(username);
        }
        
        // Nếu vẫn không tìm thấy thì throw exception
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
}
