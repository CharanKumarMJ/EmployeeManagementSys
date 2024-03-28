package com.example.myProject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class welcome {
	@GetMapping("/message")
	public String message() {
		return "Hello World!";
	}
}
