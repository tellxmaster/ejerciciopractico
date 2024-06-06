package com.tellmaster.server.service;

import com.tellmaster.server.model.CustomerOrder;
import com.tellmaster.server.repository.OrderRepository;
import com.tellmaster.server.utils.CodeGeneratorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public CustomerOrder saveOrder(CustomerOrder customerOrder) {

        if (customerOrder.getCode() == null || customerOrder.getCode().isEmpty()) {
            int orderCount = (int) orderRepository.count();
            customerOrder.setCode(CodeGeneratorUtil.generateCode("ORD-", orderCount + 1));
        }
        return orderRepository.save(customerOrder);
    }

    public Optional<CustomerOrder> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public List<CustomerOrder> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<CustomerOrder> getOrderByCode(String code) {
        return orderRepository.findByCode(code);
    }

    public void deleteOrderById(Long id) {
        orderRepository.deleteById(id);
    }

    public void deleteOrder(CustomerOrder customerOrder) {
        orderRepository.delete(customerOrder);
    }
}
