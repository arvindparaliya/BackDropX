package com.bdx.removebg.service.impl;

import com.bdx.removebg.entity.OrderEntity;
import com.bdx.removebg.repository.OrderRepository;
import com.bdx.removebg.service.OrderService;
import com.bdx.removebg.service.RazorpayService;
import com.razorpay.Order;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    public final RazorpayService razorpayService;
    public final OrderRepository orderRepository;

    private static final Map<String, PlanDetails> PLAN_DETAILS = Map.of(
            "Basic", new PlanDetails("Basic", 100, 299.00),
            "Premium", new PlanDetails("Premium", 500, 999.00),
            "Ultimate", new PlanDetails("Ultimate", 2000, 1999.00)
    );

    private record PlanDetails(String name, int credits, double amount) {

    }

    @Override
    public Order createOrder(String planId, String clerkId) throws RazorpayException {

        PlanDetails details = PLAN_DETAILS.get(planId);
        
        if (details == null) {
            throw new IllegalArgumentException("Invalid Plan Id: " + planId);
        }

        try {
            Order razorpayOrder = razorpayService.createOrder(details.amount(), "INR");

            OrderEntity newOrder = OrderEntity.builder()
                    .clerkId(clerkId)
                    .plan(details.name)
                    .credits(details.credits())
                    .amount(details.amount())
                    .orderId(razorpayOrder.get("id"))
                    .build();

            orderRepository.save(newOrder);
            return razorpayOrder;
        } 
        catch (RazorpayException e) 
        {
            throw new RazorpayException("Error occured while creating the order" + e.getMessage());
        }
    }
}