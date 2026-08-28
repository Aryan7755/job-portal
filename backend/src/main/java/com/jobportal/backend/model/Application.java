package com.jobportal.backend.model;

import com.jobportal.backend.entity.Job;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Table(name = "applications")
@Data
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Applicant name is required")
    private String applicantName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String applicantEmail;

    @NotBlank(message = "Resume link is required")
    private String resumeUrl;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @Column(length = 1000)
    private String coverNote;
}