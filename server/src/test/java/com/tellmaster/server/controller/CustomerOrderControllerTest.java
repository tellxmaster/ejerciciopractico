package com.tellmaster.server.controller;

import com.tellmaster.server.dto.ItemDTO;
import com.tellmaster.server.dto.OrderDTO;
import com.tellmaster.server.dto.ClientDTO;
import com.tellmaster.server.mapper.OrderMapper;
import com.tellmaster.server.model.Client;
import com.tellmaster.server.model.CustomerOrder;
import com.tellmaster.server.model.Item;
import com.tellmaster.server.service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.hasSize;

@WebMvcTest(CustomerOrderController.class)
@ExtendWith(RestDocumentationExtension.class)
public class CustomerOrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    @MockBean
    private OrderMapper orderMapper;

    @BeforeEach
    public void setup(WebApplicationContext webApplicationContext,
                      RestDocumentationContextProvider restDocumentation) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(documentationConfiguration(restDocumentation))
                .build();
    }

    @Test
    public void createOrder() throws Exception {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setCode("ORD001");
        orderDTO.setDate(new Date());

        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setId(1L);
        clientDTO.setName("John Doe");

        ItemDTO itemDTO1 = new ItemDTO();
        itemDTO1.setId(1L);
        itemDTO1.setName("Item 1");

        ItemDTO itemDTO2 = new ItemDTO();
        itemDTO2.setId(2L);
        itemDTO2.setName("Item 2");

        orderDTO.setClient(clientDTO);
        orderDTO.setItems(Arrays.asList(itemDTO1, itemDTO2));

        CustomerOrder customerOrder = new CustomerOrder();
        customerOrder.setCode("ORD001");
        customerOrder.setDate(new Date());

        Client client = new Client();
        client.setId(1L);
        client.setName("John Doe");

        Item item1 = new Item();
        item1.setId(1L);
        item1.setName("Item 1");

        Item item2 = new Item();
        item2.setId(2L);
        item2.setName("Item 2");

        customerOrder.setClient(client);
        customerOrder.setItems(Arrays.asList(item1, item2));

        Mockito.when(orderMapper.toOrder(orderDTO)).thenReturn(customerOrder);
        Mockito.when(orderService.saveOrder(customerOrder)).thenReturn(customerOrder);
        Mockito.when(orderMapper.toOrderDTO(customerOrder)).thenReturn(orderDTO);

        this.mockMvc.perform(post("/api/v1/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"code\":\"ORD001\", \"date\":\"2024-06-05T00:00:00.000+00:00\", \"client\":{\"id\":1, \"name\":\"John Doe\"}, \"items\":[{\"id\":1,\"name\":\"Item 1\"},{\"id\":2,\"name\":\"Item 2\"}]}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code", is("ORD001")))
                .andDo(document("create-order"));
    }


    @Test
    public void getOrderById() throws Exception {
        CustomerOrder customerOrder = new CustomerOrder();
        customerOrder.setCode("ORD001");
        customerOrder.setDate(new Date());

        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(1L);
        orderDTO.setCode("ORD001");
        orderDTO.setDate(new Date());

        Mockito.when(orderService.getOrderById(1L)).thenReturn(Optional.of(customerOrder));
        Mockito.when(orderMapper.toOrderDTO(customerOrder)).thenReturn(orderDTO);

        this.mockMvc.perform(get("/api/v1/orders/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code", is("ORD001")))
                .andDo(document("get-order-by-id"));
    }

    @Test
    public void getAllOrders() throws Exception {
        CustomerOrder order1 = new CustomerOrder();
        order1.setId(1L);
        order1.setCode("ORD001");
        order1.setDate(new Date());

        CustomerOrder order2 = new CustomerOrder();
        order2.setId(2L);
        order2.setCode("ORD002");
        order2.setDate(new Date());

        OrderDTO orderDTO1 = new OrderDTO();
        orderDTO1.setId(1L);
        orderDTO1.setCode("ORD001");
        orderDTO1.setDate(new Date());

        OrderDTO orderDTO2 = new OrderDTO();
        orderDTO2.setId(2L);
        orderDTO2.setCode("ORD002");
        orderDTO2.setDate(new Date());

        Mockito.when(orderService.getAllOrders()).thenReturn(Arrays.asList(order1, order2));
        Mockito.when(orderMapper.toOrderDTO(order1)).thenReturn(orderDTO1);
        Mockito.when(orderMapper.toOrderDTO(order2)).thenReturn(orderDTO2);

        this.mockMvc.perform(get("/api/v1/orders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].code", is("ORD001")))
                .andExpect(jsonPath("$[1].code", is("ORD002")))
                .andDo(document("get-all-orders"));
    }

    @Test
    public void updateOrder() throws Exception {
        Long orderId = 1L;
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setCode("ORD001");
        orderDTO.setDate(new Date());

        CustomerOrder customerOrder = new CustomerOrder();
        customerOrder.setId(orderId);
        customerOrder.setCode("ORD001");
        customerOrder.setDate(new Date());

        Mockito.when(orderService.getOrderById(orderId)).thenReturn(Optional.of(customerOrder));
        Mockito.when(orderMapper.toOrder(orderDTO)).thenReturn(customerOrder);
        Mockito.when(orderService.saveOrder(customerOrder)).thenReturn(customerOrder);
        Mockito.when(orderMapper.toOrderDTO(customerOrder)).thenReturn(orderDTO);

        this.mockMvc.perform(put("/api/v1/orders/{id}", orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"code\":\"ORD001\", \"date\":\"2024-06-05T00:00:00.000+00:00\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code", is("ORD001")))
                .andDo(document("update-order"));
    }

    @Test
    public void deleteOrder() throws Exception {
        Long orderId = 1L;

        CustomerOrder customerOrder = new CustomerOrder();
        customerOrder.setId(orderId);

        Mockito.when(orderService.getOrderById(orderId)).thenReturn(Optional.of(customerOrder));

        this.mockMvc.perform(delete("/api/v1/orders/{id}", orderId))
                .andExpect(status().isNoContent())
                .andDo(document("delete-order"));
    }
}
