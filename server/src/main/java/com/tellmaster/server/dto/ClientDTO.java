package com.tellmaster.server.dto;

import lombok.Data;

import java.util.List;

@Data
public class ClientDTO {
    private Long id;
    private String name;
    private String lastname;
    private List<OrderDTO> orders;
}
