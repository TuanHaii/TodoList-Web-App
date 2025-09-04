package com.example.todolist.repository;

import com.example.todolist.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    // Tìm role theo tên (USER, ADMIN, MODERATOR)
    Optional<Role> findByName(String name);
}
