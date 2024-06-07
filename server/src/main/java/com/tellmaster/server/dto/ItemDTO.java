package com.tellmaster.server.dto;

import lombok.Data;

import java.util.List;

@Data
public class ItemDTO {
    private Long id;
    private String code;
    private String imgUrl;
    private String name;
    private double price;
    private List<OrderDTO> orders;
}
