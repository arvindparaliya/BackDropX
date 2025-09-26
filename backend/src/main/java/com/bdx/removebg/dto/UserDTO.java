package com.bdx.removebg.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//user dto
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    
    private String clerkId;  

    private String email;     

    private String firstName; 

    private String lastName;  

    private String photoUrl;  

    private Integer credits;  
}
