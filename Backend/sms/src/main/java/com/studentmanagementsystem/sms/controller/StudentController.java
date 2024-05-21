package com.studentmanagementsystem.sms.controller;

import com.studentmanagementsystem.sms.model.Student;
import com.studentmanagementsystem.sms.repository.StudentJpaRepository;
import com.studentmanagementsystem.sms.repository.StudentRepository;
import com.studentmanagementsystem.sms.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
public class StudentController {
    @Autowired
    public StudentRepository stdRepository;

    @Autowired
    public StudentService stdService;

    @PostMapping("/api/students")
    public Student createStudent(@RequestBody Student student){
        return stdService.createStudent(student);
    }

    @GetMapping("/api/students/{id}")
    public Student getStudentById(@PathVariable long id){
        Student student = stdService.getStudentBYId(id);
        if(student!=null){
            return student;
        }
            return null;
    }
    @GetMapping("/api/students")
    public List<Student> getAllStudents(){
        return stdService.getAllStudents();
    }

    @PutMapping("/api/students/{id}")
    public Student updateStudent(@PathVariable long id, @RequestBody Student student){
        Student updatedStudent = stdService.updateStudent(id,student);
        return updatedStudent;
    }

    @DeleteMapping("/api/students/{id}")
    public void deleteStudent(@PathVariable long id){
        stdService.deleteStudent(id);
    }
}
