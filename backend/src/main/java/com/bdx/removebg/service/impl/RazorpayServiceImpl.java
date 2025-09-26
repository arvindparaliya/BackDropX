package com.bdx.removebg.service.impl;

import com.bdx.removebg.dto.UserDTO;
import com.bdx.removebg.entity.OrderEntity;
import com.bdx.removebg.repository.OrderRepository;
import com.bdx.removebg.service.RazorpayService;
import com.bdx.removebg.service.UserService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RazorpayServiceImpl implements RazorpayService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    private final OrderRepository orderRepository;
    private final UserService userService;

    @Override
    public Order createOrder(Double amount, String currency) throws RazorpayException {

        try {
            RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount * 100);
            orderRequest.put("currency", currency);
            orderRequest.put("receipt", "order_rcptid" + System.currentTimeMillis());

            return razorpayClient.orders.create(orderRequest);
        } 
        catch (RazorpayException e) {
            e.printStackTrace();
            throw new RazorpayException("Razorpay Error" + e.getMessage());
        }
    }

    @Override
    public Map<String, Object> verfiyPayment(String razorpayOrderId) throws RazorpayException {

        Map<String, Object> returnValue = new HashMap<>();

        try {
            RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            Order orderInfo  = razorpayClient.orders.fetch(razorpayOrderId);

            if (orderInfo.get("status").toString().equalsIgnoreCase("paid")) {
                OrderEntity existingOrder = orderRepository.findByOrderId(razorpayOrderId)
                        .orElseThrow(() -> new RuntimeException("Order not found" + razorpayOrderId));

                if (existingOrder.getPayment()) {
                    returnValue.put("success", "false");
                    returnValue.put("message", "Payment failed");

                    return returnValue;
                }

                UserDTO userDTO = userService.getUserByClerkId(existingOrder.getClerkId());
                userDTO.setCredits(userDTO.getCredits() + existingOrder.getCredits());

                userService.saveUser(userDTO);
                existingOrder.setPayment(true);

                orderRepository.save(existingOrder);
                returnValue.put("message", "Credits Added");

                return returnValue;
            }

        } 
        catch (RazorpayException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error occured while verifying the payment");
        }
        return returnValue;
    }
}
