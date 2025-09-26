package com.bdx.removebg.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bdx.removebg.dto.UserDTO;
import com.bdx.removebg.entity.UserEntity;
import com.bdx.removebg.repository.UserRepository;
import com.bdx.removebg.service.UserService;

import java.util.Optional;

@Service
@RequiredArgsConstructor 
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository; 

    @Override
    public UserDTO saveUser(UserDTO userDTO) {

        Optional<UserEntity> optionalUser = userRepository.findByClerkId(userDTO.getClerkId());

        if (optionalUser.isPresent()) {

            UserEntity existingUser = optionalUser.get();
            existingUser.setEmail(userDTO.getEmail());
            existingUser.setFirstName(userDTO.getFirstName());
            existingUser.setLastName(userDTO.getLastName());
            existingUser.setPhotoUrl(userDTO.getPhotoUrl());
            
            if (userDTO.getCredits() != null) {
                existingUser.setCredits(userDTO.getCredits());
            }

            existingUser = userRepository.save(existingUser);
            return mapToDTO(existingUser);
        }

        UserEntity newUser = mapToEntity(userDTO);
        userRepository.save(newUser);

        return mapToDTO(newUser);
    }

    @Override
    public UserDTO getUserByClerkId(String clerkId) {

        UserEntity userEntity = userRepository.findByClerkId(clerkId)
                .orElseThrow(() -> new UsernameNotFoundException("User with clerkId " + clerkId + " not found"));

        return mapToDTO(userEntity);
    }

    @Override
    public void deleteUserByClerkId(String clerkId) {

        UserEntity userEntity = userRepository.findByClerkId(clerkId)
                .orElseThrow(() -> new UsernameNotFoundException("User with clerkId " + clerkId + " not found"));

        userRepository.delete(userEntity);
    }

    private UserDTO mapToDTO(UserEntity newUser) {

        return UserDTO.builder()
                .clerkId(newUser.getClerkId())
                .credits(newUser.getCredits())
                .email(newUser.getEmail())
                .firstName(newUser.getFirstName())
                .lastName(newUser.getLastName())
                .photoUrl(newUser.getPhotoUrl())
                .build();
    }

    private UserEntity mapToEntity(UserDTO userDTO) {
        
        return UserEntity.builder()
                .clerkId(userDTO.getClerkId())
                .email(userDTO.getEmail())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .photoUrl(userDTO.getPhotoUrl())
                .build();
    }
}
