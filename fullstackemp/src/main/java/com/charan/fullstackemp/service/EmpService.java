package com.charan.fullstackemp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.charan.fullstackemp.model.Employee;
import com.charan.fullstackemp.repository.EmpRepo;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmpService {

	@Autowired
	private EmpRepo empRepo;
	
	public Employee postEmployee(Employee employee) {
		return empRepo.save(employee);
	}
	
	public List<Employee> getAllEmployees(){
		return empRepo.findAll();
	}
	
	public void deleteEmployee(long id) {
		if(!empRepo.existsById(id)) {
			throw new EntityNotFoundException("Employee with id "+" "+ id+" "+ " not found");
		}
		
		empRepo.deleteById(id);
	}
	
	public Employee getEmployeeById(long id) {
		return empRepo.findById(id).orElse(null);
	}
	
	public Employee updateEmployee(long id, Employee employee ) {
		Optional<Employee> optionalEmployee = empRepo.findById(id);
		if(optionalEmployee.isPresent()) {
			Employee existingEmployee = optionalEmployee.get();
			
			existingEmployee.setEmail(employee.getEmail());
			existingEmployee.setName(employee.getName());
			existingEmployee.setPhone(employee.getPhone());
			existingEmployee.setDepartment(employee.getDepartment());
		
			return empRepo.save(existingEmployee);
		}
		return null;
	}
}
