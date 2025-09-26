package com.bdx.removebg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bdx.removebg.entity.UserEntity;

import java.util.Optional;


public interface UserRepository extends JpaRepository<UserEntity, Long> {

    boolean existsByClerkId(String clerkId);

    Optional<UserEntity> findByClerkId(String clerkId);
}
