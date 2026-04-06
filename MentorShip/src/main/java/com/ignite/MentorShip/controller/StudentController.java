package com.ignite.MentorShip.controller;

import com.ignite.MentorShip.dto.*;
import com.ignite.MentorShip.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin("http://localhost:3000")
public class StudentController {

    @Autowired
    StudentService studentService;

    @PostMapping("/register")
    public String register(@RequestBody StudentRegisterDTO dto){

        return studentService.registerStudent(dto);
    }

    @PostMapping("/login")
    public StudentResponseDTO login(@RequestBody StudentLoginDTO dto){
        return studentService.loginStudent(dto);
    }

    @GetMapping("/{id}")
    public Object getStudent(@PathVariable Long id){
        return studentService.getStudent(id);
    }

    @PostMapping("/project")
    public String uploadProject(@RequestBody ProjectDTO dto){
        return studentService.uploadProject(dto);
    }

    @GetMapping("/projects/{studentId}")
    public Object getProjects(@PathVariable Long studentId){
        return studentService.getStudentProjects(studentId);
    }

    @PutMapping("/{id}")
    public String updateStudent(@PathVariable Long id,
                               @RequestBody StudentRegisterDTO dto){
        return studentService.updateStudent(id,dto);
    }
}