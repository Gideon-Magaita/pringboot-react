package com.backend.employee.service.impl;

import com.backend.employee.dto.DepartmentDto;
import com.backend.employee.entity.Department;
import com.backend.employee.exception.ResourceNotFoundException;
import com.backend.employee.mapper.DepartmentMapper;
import com.backend.employee.repository.DepartmentRepository;
import com.backend.employee.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
       Department department = DepartmentMapper.mapToDepartment(departmentDto);
       Department savedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public DepartmentDto getDepartmentById(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).
                orElseThrow(()->
                new ResourceNotFoundException("Department with the given id does not found: "+departmentId));
        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll();
        return departments.stream().map((department)->
                DepartmentMapper.mapToDepartmentDto(department)).
                collect(Collectors.toList());
    }

    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto updatedDepartment) {
        Department department = departmentRepository.findById(departmentId).
                orElseThrow(()->new ResourceNotFoundException("Department with the given Id does not found"+departmentId));

        department.setDepartmentName(updatedDepartment.getDepartmentName());
        department.setDepartmentDescription(updatedDepartment.getDepartmentDescription());

        Department savedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }
}
