package com.jobportal.backend;

import com.jobportal.backend.entity.Job;
import com.jobportal.backend.repository.JobRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class JobServiceTest {

    @Mock
    private JobRepository jobRepository; // Mock database repository

    // If you have a JobService class, inject it here. For now, let's test
    // repository mocking behavior directly or add a service test.

    @Test
    void testFindJobById() {
        // Arrange: Create a mock job and tell the mock repository what to return
        Job mockJob = new Job();
        mockJob.setId(1L);
        mockJob.setTitle("Backend Engineer");
        mockJob.setSalary(100000.0);

        when(jobRepository.findById(1L)).thenReturn(Optional.of(mockJob));

        // Act: Call the mock repository
        Job foundJob = jobRepository.findById(1L).orElse(null);

        // Assert: Verify the results match expectations
        assertEquals("Backend Engineer", foundJob.getTitle());
        assertEquals(100000.0, foundJob.getSalary());
    }
}