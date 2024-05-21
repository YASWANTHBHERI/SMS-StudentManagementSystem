package com.studentmanagementsystem.sms.repository;

import com.studentmanagementsystem.sms.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentJpaRepository extends JpaRepository<Student,Long> {
}
