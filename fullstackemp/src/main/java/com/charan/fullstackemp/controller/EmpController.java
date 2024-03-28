package com.charan.fullstackemp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.charan.fullstackemp.model.Employee;
import com.charan.fullstackemp.service.EmpService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmpController {

	@Autowired
	private EmpService empService;
	
	@PostMapping("/employee")
	public Employee postEmployee(@RequestBody Employee employee) {
		return empService.postEmployee(employee);
	}
	
	@GetMapping("/employees")
	public List<Employee> getAllEmployees(){
		return empService.getAllEmployees();
	}
	
	@DeleteMapping("/employee/{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable long id) {
		try {
			empService.deleteEmployee(id);
			return new ResponseEntity<>("Employee with id"+" "+id+" "+" deleted successfully", HttpStatus.OK);
		} catch (EntityNotFoundException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
		
	}
	
	@GetMapping("/employee/{id}")
	public ResponseEntity<?> getEmployeeById(@PathVariable long id){
		Employee employee = empService.getEmployeeById(id);
		if(employee == null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(employee);
		
	}
	
	@PatchMapping("/employee/{id}")
	public ResponseEntity<?> updateEmployee(@PathVariable long id, @RequestBody Employee employee){
		Employee updatedEmployee = empService.updateEmployee(id, employee);
		
		if(updatedEmployee == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		return ResponseEntity.ok(updatedEmployee);
	}
}

