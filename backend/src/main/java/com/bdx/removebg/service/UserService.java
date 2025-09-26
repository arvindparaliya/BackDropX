package com.bdx.removebg.service;

import com.bdx.removebg.dto.UserDTO;

public interface UserService {
    
    UserDTO saveUser(UserDTO userDTO);

    UserDTO getUserByClerkId(String clerkId);

    void deleteUserByClerkId(String clerkId);
}