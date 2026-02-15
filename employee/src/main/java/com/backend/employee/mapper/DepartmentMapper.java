package com.backend.employee.mapper;

import com.backend.employee.dto.DepartmentDto;
import com.backend.employee.entity.Department;

public class DepartmentMapper {
    //department Jpa entity to department Dto
    public static DepartmentDto mapToDepartmentDto(Department department){
               return new DepartmentDto(
                       department.getId(),
                       department.getDepartmentName(),
                       department.getDepartmentDescription()
               );
    }

    //departmentDto to department Jpa Entity
    public static Department mapToDepartment(DepartmentDto departmentDto){
        return new Department(
                departmentDto.getId(),
                departmentDto.getDepartmentName(),
                departmentDto.getDepartmentDescription()
        );
    }
}
