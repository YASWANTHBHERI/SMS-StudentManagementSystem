package com.studentmanagementsystem.sms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String studentRollNo;
    private String studentName;
    private String studentEmail;
    private String studentAddress;

    public Student(long id, String studentRollNo, String studentName, String studentAddress, String studentEmail){
        this.id = id;
        this.studentRollNo = studentRollNo;
        this.studentName=studentName;
        this.studentEmail = studentEmail;
        this.studentAddress = studentAddress;
    }

    public Student(){}


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStudentRollNo(){
        return studentRollNo;
    }
    public void setStudentRollNo(String studentRollNo){
        this.studentRollNo = studentRollNo;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getStudentAddress() {
        return studentAddress;
    }

    public void setStudentAddress(String studentAddress) {
        this.studentAddress = studentAddress;
    }
}
