USE job_portal_db;

INSERT INTO users (name, email, password, role) VALUES
('Tech Corp Admin', 'admin@techcorp.com', 'admin123', 'EMPLOYER'),
('InnoTech HR', 'hr@innotech.com', 'hr123', 'EMPLOYER'),
('John Doe', 'john@gmail.com', 'pass123', 'CANDIDATE'),
('Jane Smith', 'jane@gmail.com', 'pass123', 'CANDIDATE');

INSERT INTO jobs (title, description, salary, employer_id) VALUES
('Backend Developer', 'Looking for a Java Spring Boot developer with MySQL experience.', 85000.00, 1),
('Frontend Engineer', 'Need a React developer with basic Tailwind and REST API knowledge.', 75000.00, 1),
('Full Stack Intern', 'Entry-level full stack role working with Java and React.', 40000.00, 2);

INSERT INTO applications (job_id, candidate_id, status) VALUES
(1, 3, 'APPLIED'),
(2, 3, 'APPLIED'),
(3, 4, 'REVIEWED');