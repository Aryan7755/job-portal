package com.jobportal.backend.controller;

import com.jobportal.backend.model.Application;
import com.jobportal.backend.repository.ApplicationRepository;
import com.jobportal.backend.repository.JobRepository;
import jakarta.validation.Valid; // <-- Add this import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @PostMapping
    public ResponseEntity<?> applyForJob(@Valid @RequestBody Application application, @RequestParam Long jobId) {
        return jobRepository.findById(jobId)
                .map(job -> {
                    application.setJob(job);
                    Application savedApplication = applicationRepository.save(application);
                    return ResponseEntity.ok(savedApplication);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Get all applications or filter by job ID
    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications(@RequestParam(required = false) Long jobId) {
        if (jobId != null) {
            // Optional: If you want to fetch applications for a specific job only
        }
        return ResponseEntity.ok(applicationRepository.findAll());
    }
}