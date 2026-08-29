package com.jobportal.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Username is required")
    @Column(unique = true , nullable = false)
    private String username;
    @NotBlank(message = "Password is required")
    @Column(nullable = false)
    private String password;
    @NotBlank(message = "Email is required")
    @Column(unique = true , nullable = false)
    private String email;
    @NotBlank(message = "Role is required")
    private String role;

}
