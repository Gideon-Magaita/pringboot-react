package com.backend.employee.service.impl;

import com.backend.employee.dto.EmployeeDto;
import com.backend.employee.entity.Department;
import com.backend.employee.entity.Employee;
import com.backend.employee.exception.ResourceNotFoundException;
import com.backend.employee.mapper.EmployeeMapper;
import com.backend.employee.repository.DepartmentRepository;
import com.backend.employee.repository.EmployeeRepository;
import com.backend.employee.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private DepartmentRepository departmentRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);

        //inject department to add employee logic
        Department department = departmentRepository.findById(employeeDto.getDepartmentId())
                .orElseThrow(()->
                        new ResourceNotFoundException("Department with the given id does not found"+employeeDto.getDepartmentId()));
        employee.setDepartment(department);
        //end injecting

        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }


    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Employee with the given Id not found:" + employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee)->EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee) {
        Employee employee= employeeRepository.findById(employeeId).
                orElseThrow(()->
                        new ResourceNotFoundException("Employee Id not found" + employeeId));

        employee.setFirstName(updateEmployee.getFirstName());
        employee.setLastName(updateEmployee.getLastName());
        employee.setEmail(updateEmployee.getEmail());

        //inject department to add employee logic
        Department department = departmentRepository.findById(updateEmployee.getDepartmentId())
                .orElseThrow(()->
                        new ResourceNotFoundException("Department with the given id does not found"+updateEmployee.getDepartmentId()));
        employee.setDepartment(department);
        //end injecting

        Employee updatedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()->
                new ResolutionException("Employee id not found: "+ employeeId));
        employeeRepository.deleteById(employeeId);
    }
}
