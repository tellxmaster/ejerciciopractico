package com.tellmaster.server.dto;

import lombok.Data;

@Data
public class OrderItemDTO {
    private Long id;
    private ItemDTO item;
    private int quantity;
}