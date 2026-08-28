package com.jobportal.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "employer_id", nullable = true)
    private Long employerId;
    
    private Double salary;

    // 1. Default No-Args Constructor (CRITICAL for Jackson and JPA)
    public Job() {
    }

    // 2. All-Args Constructor
    public Job(Long id, String title, String description, Long employerId, Double salary) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.employerId = employerId;
        this.salary = salary;
    }

    // --- Getters and Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public Long getEmployerId() {
        return employerId;
    }

    public void setEmployerId(Long employerId) {
        this.employerId = employerId;
    }
}