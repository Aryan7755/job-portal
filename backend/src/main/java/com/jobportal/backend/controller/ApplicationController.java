package com.jobportal.backend.controller;

import com.jobportal.backend.model.Application;
import com.jobportal.backend.repository.ApplicationRepository;
import com.jobportal.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @PostMapping
    public ResponseEntity<?> applyForJob(@RequestBody Application application, @RequestParam Long jobId) {
        return jobRepository.findById(jobId)
                .map(job -> {
                    application.setJob(job);
                    Application savedApplication = applicationRepository.save(application);
                    return ResponseEntity.ok(savedApplication);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}