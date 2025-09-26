package com.bdx.removebg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class RemovebgApplication {

	public static void main(String[] args) {
		SpringApplication.run(RemovebgApplication.class, args);
		System.out.println("BackDropX is running fine!");
	}

}
