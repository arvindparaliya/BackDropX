package com.bdx.removebg.controller;

import com.bdx.removebg.dto.RazorpayOrderDTO;
import com.bdx.removebg.response.RemoveBgResponse;
import com.bdx.removebg.service.RazorpayService;
import com.bdx.removebg.service.impl.OrderServiceImpl;
import com.razorpay.Order;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;

// import org.hibernate.type.descriptor.java.ObjectJavaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    public final OrderServiceImpl orderService;
    private final RazorpayService razorpayService;

    //order create
    @PostMapping 
    public ResponseEntity<?> createOrder(@RequestParam String planId, Authentication authentication) throws RazorpayException {
        Map<String, Object> responseMap = new HashMap<>();
        RemoveBgResponse response = null;

        if (authentication.getName().isEmpty() || authentication.getName() == null) {
            RemoveBgResponse.builder()
                    .statusCode(HttpStatus.FORBIDDEN)
                    .success(false)
                    .data("Sorry, you don't have access for razorpay")
                    .build();

            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseMap);
        }

        try {
            Order order = orderService.createOrder(planId, authentication.getName());
            RazorpayOrderDTO responseDTO = convertToDTO(order);

            response = RemoveBgResponse.builder()
                    .success(true)
                    .data(responseDTO)
                    .statusCode(HttpStatus.CREATED)
                    .build();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response = RemoveBgResponse.builder()
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                    .data(e.getMessage())
                    .success(false)
                    .build();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    private RazorpayOrderDTO convertToDTO(Order order) {
        return RazorpayOrderDTO.builder()
                .id(order.get("id"))
                .entity(order.get("entity"))
                .amount(order.get("amount"))
                .currency(order.get("currency"))
                .status(order.get("status"))
                .created_at(order.get("created_at"))
                .receipt(order.get("receipt"))
                .build();
    }
    
    //verification
    @PostMapping("/verify")
    public ResponseEntity<?> verfiyOrder(@RequestBody Map<String, Object> request) throws RazorpayException {
        System.out.println("Hitting the api to verfiy order");
        try {
            String razorpayOrderId = request.get("razorpay_order_id").toString();
            Map<String, Object> returnValue = razorpayService.verfiyPayment(razorpayOrderId);

            return ResponseEntity.ok(returnValue);
        } catch (RazorpayException e) {
            Map<String, Object> errorResponse = new HashMap<>();

            errorResponse.put("success", false);
            errorResponse.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }

    }
}
