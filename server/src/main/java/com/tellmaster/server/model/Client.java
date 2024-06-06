package com.tellmaster.server.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data

public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String lastname;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CustomerOrder> customerOrders;
}
