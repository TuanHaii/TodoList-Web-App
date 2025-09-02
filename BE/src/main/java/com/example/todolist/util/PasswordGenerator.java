package com.example.todolist.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        System.out.println("password123: " + encoder.encode("password123"));
        System.out.println("admin123: " + encoder.encode("admin123"));
        System.out.println("john123: " + encoder.encode("john123"));
    }
}
