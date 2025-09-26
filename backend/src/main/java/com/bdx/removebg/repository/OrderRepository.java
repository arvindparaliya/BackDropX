package com.bdx.removebg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bdx.removebg.entity.OrderEntity;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    
    Optional<OrderEntity> findByOrderId(String orderId);
}