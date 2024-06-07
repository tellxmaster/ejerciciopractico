package com.tellmaster.server.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = true)
    private String code;
    private String name;
    private String imageUrl;
    private double price;

    @OneToMany(mappedBy = "item")
    private List<OrderItem> orderItems;
}
