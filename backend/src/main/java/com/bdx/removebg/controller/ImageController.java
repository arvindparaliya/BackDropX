package com.bdx.removebg.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.bdx.removebg.dto.UserDTO;
import com.bdx.removebg.response.RemoveBgResponse;
import com.bdx.removebg.service.RemoveBackgroundService;
import com.bdx.removebg.service.UserService;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {
    private final RemoveBackgroundService removeBackgroundService;
    private final UserService userService;

    @PostMapping("/remove-background")
    public ResponseEntity<?> removeBackground(@RequestParam("file") MultipartFile file, Authentication authentication) {
        System.out.println("Api request is coming for remove-background");
        RemoveBgResponse response = null;
        Map<String, Object> responseMap = new HashMap<>();

        try {
            System.out.println("In the try block");
            if (authentication.getName().isEmpty() || authentication.getName() == null) {
                RemoveBgResponse.builder()
                        .statusCode(HttpStatus.FORBIDDEN)
                        .success(false)
                        .data("you don't have access for this feature, sorry")
                        .build();

                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseMap);
            }

            UserDTO userDTO = userService.getUserByClerkId(authentication.getName());

            if (userDTO.getCredits() == 0) {
                responseMap.put("message", "No credit balance");
                responseMap.put("creditBalance", userDTO.getCredits());
                response = RemoveBgResponse.builder()
                        .success(false)
                        .data(responseMap)
                        .statusCode(HttpStatus.OK)
                        .build();
                return ResponseEntity.ok(response);
            }

            byte[] imageBytes = removeBackgroundService.removeBackground(file);
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            userDTO.setCredits(userDTO.getCredits() - 1);

            userService.saveUser(userDTO);

            return ResponseEntity.ok()
                    .contentType(MediaType.TEXT_PLAIN)
                    .body(base64Image);
        } 
        catch (Exception e) 
        {
            System.out.println("In the catch block");
            e.printStackTrace();
            response = RemoveBgResponse.builder()
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                    .success(false)
                    .data("An error occurred.")
                    .build();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(response);
        }
    }
}
