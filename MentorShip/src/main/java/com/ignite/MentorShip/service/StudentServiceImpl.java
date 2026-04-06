package com.ignite.MentorShip.service;

import com.ignite.MentorShip.dto.*;
import com.ignite.MentorShip.entity.Mentor;
import com.ignite.MentorShip.entity.Project;
import com.ignite.MentorShip.entity.Student;
import com.ignite.MentorShip.repository.ProjectRepository;
import com.ignite.MentorShip.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Override
    public String updateStudent(Long id, StudentRegisterDTO dto) {

        Optional<Student> student = studentRepository.findById(id);

        if(student.isPresent()){

            Student s = student.get();

            s.setName(dto.getName());
            s.setCollege(dto.getCollege());
            s.setEmail(dto.getEmail());
            s.setPhone(dto.getPhone());

            studentRepository.save(s);

            return "Mentor Updated Successfully";
        }

        return "Mentor Not Found";

    }

    @Override
    public String registerStudent(StudentRegisterDTO dto) {

        Student student = new Student();

        student.setName(dto.getName());
        student.setEmail(dto.getEmail());
        student.setPassword(dto.getPassword());
        student.setCollege(dto.getCollege());
        student.setPhone(dto.getPhone());

        studentRepository.save(student);

        return "Student Registered Successfully";
    }

    @Override
    public StudentResponseDTO loginStudent(StudentLoginDTO dto) {

        Student student = studentRepository
                .findByEmailAndPassword(dto.getEmail(), dto.getPassword());

        if (student == null) {
            throw new RuntimeException("Invalid Email or Password");
        }

        StudentResponseDTO response = new StudentResponseDTO();
        response.setId(student.getId());

        response.setName(student.getName());
        response.setEmail(student.getEmail());
        response.setCollege(student.getCollege());
        response.setPhone(student.getPhone());

        return response;
    }

    @Override
    public Object getStudent(Long id) {

        return studentRepository.findById(id);
    }

    @Override
    public String uploadProject(ProjectDTO dto) {

        Optional<Student> student = studentRepository.findById(dto.getStudentId());

        if(student.isEmpty())
            return "Student not found";

        Project project = new Project();

        project.setProjectName(dto.getProjectName());
        project.setDomain(dto.getDomain());
        project.setBudget(dto.getBudget());
        project.setDescription(dto.getDescription());
        project.setTools(dto.getTools());
        project.setTechnologies(dto.getTechnologies());
        project.setStudent(student.get());

        projectRepository.save(project);

        return "Project Uploaded";
    }

    @Override
    public List<Project> getStudentProjects(Long studentId) {

        return projectRepository.findByStudentId(studentId);
    }
}