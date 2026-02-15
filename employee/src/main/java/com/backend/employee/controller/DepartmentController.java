package com.backend.employee.controller;


import com.backend.employee.dto.DepartmentDto;
import com.backend.employee.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/departments")
public class DepartmentController {
    private DepartmentService departmentService;


    @PostMapping
    public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto){
        DepartmentDto savedDepartment = departmentService.createDepartment(departmentDto);
        return new ResponseEntity<>(savedDepartment, HttpStatus.CREATED);
    }
    @GetMapping("{id}")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable("id") Long departmentId){
        DepartmentDto departmentDto = departmentService.getDepartmentById(departmentId);
        return ResponseEntity.ok(departmentDto);
    }
    @GetMapping
    public ResponseEntity<List<DepartmentDto>>getAllDepartments(){
       List<DepartmentDto> departments = departmentService.getAllDepartments();
        return ResponseEntity.ok(departments);
    }
    @PutMapping("{id}")
    public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable("id") Long departmentId,
                                                          @RequestBody DepartmentDto updatedDepartment){
        DepartmentDto departmentDto= departmentService.updateDepartment(departmentId,updatedDepartment);

        return ResponseEntity.ok(departmentDto);
    }
}
