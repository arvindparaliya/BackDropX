package com.bdx.removebg.service;

import com.razorpay.Order;
import com.razorpay.RazorpayException;

import java.util.Map;

public interface RazorpayService {

    Order createOrder(Double amount, String currency) throws RazorpayException;

    Map<String, Object> verfiyPayment(String razorpayOrderId) throws RazorpayException;
    
}