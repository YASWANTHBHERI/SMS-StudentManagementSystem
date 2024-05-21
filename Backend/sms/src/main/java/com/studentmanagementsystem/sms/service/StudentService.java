package com.studentmanagementsystem.sms.service;

import com.studentmanagementsystem.sms.model.Student;
import com.studentmanagementsystem.sms.repository.StudentJpaRepository;
import com.studentmanagementsystem.sms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService implements StudentRepository {
    @Autowired
    public StudentJpaRepository jpaRepository;
    @Override
    public Student createStudent(Student student) {
        return jpaRepository.save(student);
    }

    @Override
    public Student getStudentBYId(long id) {
        Student student = jpaRepository.findById(id).orElse(null);
        return student;
    }

    @Override
    public List<Student> getAllStudents() {
        return jpaRepository.findAll();
    }

    @Override
    public Student updateStudent(long id, Student student) {
        Student updatedStudent = jpaRepository.findById(id).orElse(null);
        if(updatedStudent!=null){
            if(student.getStudentRollNo()!=null){
                updatedStudent.setStudentRollNo(student.getStudentRollNo());
            }
           if(student.getStudentName()!=null){
               updatedStudent.setStudentName(student.getStudentName());
           }if(student.getStudentEmail()!=null){
               updatedStudent.setStudentEmail(student.getStudentEmail());
           }if(student.getStudentAddress()!=null){
               updatedStudent.setStudentAddress(student.getStudentAddress());
           }
            return jpaRepository.save(updatedStudent);
        }
        return null;
    }

    @Override
    public void deleteStudent(long id) {
        jpaRepository.deleteById(id);
    }
}
