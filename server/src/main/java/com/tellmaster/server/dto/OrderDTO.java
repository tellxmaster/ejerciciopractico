package com.tellmaster.server.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderDTO {
    private Long id;
    private String code;
    private Date date;
    private ClientDTO client;
    private List<ItemDTO> items;
}
