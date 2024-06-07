package com.tellmaster.server.service;

import com.tellmaster.server.model.CustomerOrder;
import com.tellmaster.server.model.Item;
import com.tellmaster.server.model.OrderItem;
import com.tellmaster.server.repository.ItemRepository;
import com.tellmaster.server.repository.OrderItemRepository;
import com.tellmaster.server.repository.OrderRepository;
import com.tellmaster.server.utils.CodeGeneratorUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Transactional
    public CustomerOrder saveOrder(CustomerOrder customerOrder) {

        processOrderItems(customerOrder);

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

    private void processOrderItems(CustomerOrder customerOrder) {
        List<OrderItem> orderItems = customerOrder.getOrderItems();
        for (OrderItem orderItem : orderItems) {
            Item item = orderItem.getItem();
            if (item.getId() != null) {
                Item managedItem = itemRepository.findById(item.getId())
                        .orElseThrow(() -> new RuntimeException("Item not found"));
                orderItem.setItem(managedItem);
            } else {
                item = itemRepository.save(item);
                orderItem.setItem(item);
            }
            orderItem.setOrder(customerOrder);
        }
        customerOrder.setOrderItems(orderItems);
    }
}
