package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

	@Value("${user.role}")
	String userRole;
	
	@GetMapping("/test")
	public String test() {
		return userRole;
	}
}
