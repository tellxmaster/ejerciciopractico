package com.tellmaster.server.controller;

import com.tellmaster.server.dto.OrderDTO;
import com.tellmaster.server.mapper.OrderMapper;
import com.tellmaster.server.model.CustomerOrder;
import com.tellmaster.server.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/orders")
public class CustomerOrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderMapper orderMapper;

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO orderDTO) {
        CustomerOrder customerOrder = orderMapper.toOrder(orderDTO);
        CustomerOrder savedCustomerOrder = orderService.saveOrder(customerOrder);
        OrderDTO responseDTO = orderMapper.toOrderDTO(savedCustomerOrder);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        Optional<CustomerOrder> order = orderService.getOrderById(id);
        return order.map(value -> ResponseEntity.ok(orderMapper.toOrderDTO(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        List<CustomerOrder> customerOrders = orderService.getAllOrders();
        List<OrderDTO> orderDTOs = customerOrders.stream().map(orderMapper::toOrderDTO).collect(Collectors.toList());
        return ResponseEntity.ok(orderDTOs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDTO> updateOrder(@PathVariable Long id, @RequestBody OrderDTO orderDTO) {
        Optional<CustomerOrder> orderOptional = orderService.getOrderById(id);
        if (orderOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        CustomerOrder customerOrder = orderMapper.toOrder(orderDTO);
        customerOrder.setId(id);
        CustomerOrder updatedCustomerOrder = orderService.saveOrder(customerOrder);
        return ResponseEntity.ok(orderMapper.toOrderDTO(updatedCustomerOrder));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        if (orderService.getOrderById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        orderService.deleteOrderById(id);
        return ResponseEntity.noContent().build();
    }
}