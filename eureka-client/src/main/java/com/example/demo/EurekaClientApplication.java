package com.example.demo;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.stereotype.Component;

@SpringBootApplication
@EnableDiscoveryClient
public class EurekaClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(EurekaClientApplication.class, args);
	}

}

@Component
class DiscoveryClientExample implements CommandLineRunner{
	
//	 @Autowired
//	 private DiscoveryClient discoveryClient;

	@Override
	public void run(String... args) throws Exception {
		
//		discoveryClient.getInstances("eureka-server").forEach((ServiceInstance s) -> {
//            System.out.println(ToStringBuilder.reflectionToString(s));
//        });
		
		System.out.println("Hi");
		
	}
	
}
