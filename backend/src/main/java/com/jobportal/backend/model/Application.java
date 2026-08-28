package com.jobportal.backend.model;

import com.jobportal.backend.entity.Job;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "applications")
@Data
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String applicantName;
    private String applicantEmail;
    private String resumeUrl;
    
    @Column(length = 1000)
    private String coverNote;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;
}