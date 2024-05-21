package com.studentmanagementsystem.sms.repository;


import com.studentmanagementsystem.sms.model.Student;

import java.util.List;

public interface StudentRepository {

    Student createStudent(Student student);
    Student getStudentBYId(long id);
    List<Student> getAllStudents();

    Student updateStudent(long id, Student student);

    void deleteStudent(long id);
}
