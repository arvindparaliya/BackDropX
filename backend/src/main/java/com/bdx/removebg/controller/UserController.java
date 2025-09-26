package com.bdx.removebg.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.bdx.removebg.dto.UserDTO;
import com.bdx.removebg.response.RemoveBgResponse;
import com.bdx.removebg.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    //update user or create
    @PostMapping
    public ResponseEntity<?> createOrUpdateUser(@RequestBody UserDTO userDTO, Authentication authentication) {
        System.out.println("Api hit");

        RemoveBgResponse response = null;
        try {
            System.out.println("In the try block");
            if (!authentication.getName().equals(userDTO.getClerkId())) {
                  response =  RemoveBgResponse.builder()
                        .success(false)
                        .data("Sorry, you don't have access to this features.")
                        .statusCode(HttpStatus.FORBIDDEN)
                        .build();
                 return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            System.out.println("In the try block");

            UserDTO user = userService.saveUser(userDTO);

            response =  RemoveBgResponse.builder()
                    .success(true) 
                    .data(user) 
                    .statusCode(HttpStatus.OK) 
                    .build(); 
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } 
        catch(Exception exception)
         {
            System.out.println("In the catch block");

            response = RemoveBgResponse.builder()
                    .success(false) 
                    .data(exception.getMessage()) 
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR) 
                    .build(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //creditss
    @GetMapping("/credits")
    public ResponseEntity<?> getUserCredits(Authentication authentication) {
        RemoveBgResponse bgResponse = null;
        try {
            if (authentication.getName().isEmpty() || authentication.getName() == null) {
                bgResponse = RemoveBgResponse.builder()
                        .statusCode(HttpStatus.FORBIDDEN)
                        .data("Access denied. Required scope is missing")
                        .success(false)
                        .build();

                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(bgResponse);
            }

            String clerkId = authentication.getName();
            UserDTO existingUser = userService.getUserByClerkId(clerkId);

            Map<String, Integer> map = new HashMap<>();
            map.put("credits", existingUser.getCredits());
            bgResponse = RemoveBgResponse.builder()
                        .statusCode(HttpStatus.OK)
                        .data(map)
                        .success(true)
                        .build();

            return ResponseEntity.status(HttpStatus.OK).
                    body(bgResponse);
        } catch(Exception e) {
            bgResponse = RemoveBgResponse.builder()
                    .statusCode(HttpStatus.OK)
                    .data("an error occurred")
                    .success(false)
                    .build();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(bgResponse);
        }
    }
}