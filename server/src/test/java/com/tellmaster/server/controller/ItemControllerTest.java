package com.tellmaster.server.controller;

import com.tellmaster.server.dto.ItemDTO;
import com.tellmaster.server.mapper.ItemMapper;
import com.tellmaster.server.model.Item;
import com.tellmaster.server.service.ItemService;
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
import java.util.Optional;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.hasSize;

@WebMvcTest(ItemController.class)
@ExtendWith(RestDocumentationExtension.class)
public class ItemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ItemService itemService;

    @MockBean
    private ItemMapper itemMapper;

    @BeforeEach
    public void setup(WebApplicationContext webApplicationContext,
                      RestDocumentationContextProvider restDocumentation) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(documentationConfiguration(restDocumentation))
                .build();
    }

    @Test
    public void createItem() throws Exception {
        ItemDTO itemDTO = new ItemDTO();
        itemDTO.setCode("item001");
        itemDTO.setName("Item 1");
        itemDTO.setPrice(100.0);

        Item item = new Item();
        item.setCode("item001");
        item.setName("Item 1");
        item.setPrice(100.0);

        Mockito.when(itemMapper.toItem(itemDTO)).thenReturn(item);
        Mockito.when(itemService.saveItem(item)).thenReturn(item);
        Mockito.when(itemMapper.toItemDTO(item)).thenReturn(itemDTO);

        this.mockMvc.perform(post("/api/v1/items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"code\":\"item001\", \"name\":\"Item 1\", \"price\":100.0}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code", is("item001")))
                .andExpect(jsonPath("$.name", is("Item 1")))
                .andExpect(jsonPath("$.price", is(100.0)))
                .andDo(document("create-item"));
    }

    @Test
    public void getItemById() throws Exception {
        Long itemId = 1L;
        Item item = new Item();
        item.setId(itemId);
        item.setCode("item001");
        item.setName("Item 1");
        item.setPrice(100.0);

        ItemDTO itemDTO = new ItemDTO();
        itemDTO.setId(itemId);
        itemDTO.setCode("item001");
        itemDTO.setName("Item 1");
        itemDTO.setPrice(100.0);

        Mockito.when(itemService.getItemById(itemId)).thenReturn(Optional.of(item));
        Mockito.when(itemMapper.toItemDTO(item)).thenReturn(itemDTO);

        this.mockMvc.perform(get("/api/v1/items/{id}", itemId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code", is("item001")))
                .andExpect(jsonPath("$.name", is("Item 1")))
                .andExpect(jsonPath("$.price", is(100.0)))
                .andDo(document("get-item-by-id"));
    }

    @Test
    public void getAllItems() throws Exception {
        Item item1 = new Item();
        item1.setId(1L);
        item1.setCode("item001");
        item1.setName("Item 1");
        item1.setPrice(100.0);

        Item item2 = new Item();
        item2.setId(2L);
        item2.setCode("item002");
        item2.setName("Item 2");
        item2.setPrice(200.0);

        ItemDTO itemDTO1 = new ItemDTO();
        itemDTO1.setId(1L);
        itemDTO1.setCode("item001");
        itemDTO1.setName("Item 1");
        itemDTO1.setPrice(100.0);

        ItemDTO itemDTO2 = new ItemDTO();
        itemDTO2.setId(2L);
        itemDTO2.setCode("item002");
        itemDTO2.setName("Item 2");
        itemDTO2.setPrice(200.0);

        Mockito.when(itemService.getAllItems()).thenReturn(Arrays.asList(item1, item2));
        Mockito.when(itemMapper.toItemDTO(item1)).thenReturn(itemDTO1);
        Mockito.when(itemMapper.toItemDTO(item2)).thenReturn(itemDTO2);

        this.mockMvc.perform(get("/api/v1/items"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].code", is("item001")))
                .andExpect(jsonPath("$[0].name", is("Item 1")))
                .andExpect(jsonPath("$[0].price", is(100.0)))
                .andExpect(jsonPath("$[1].code", is("item002")))
                .andExpect(jsonPath("$[1].name", is("Item 2")))
                .andExpect(jsonPath("$[1].price", is(200.0)))
                .andDo(document("get-all-items"));
    }

    @Test
    public void updateItem() throws Exception {
        Long itemId = 1L;
        ItemDTO itemDTO = new ItemDTO();
        itemDTO.setCode("item001");
        itemDTO.setName("Item 1 Updated");
        itemDTO.setPrice(150.0);

        Item item = new Item();
        item.setId(itemId);
        item.setCode("item001");
        item.setName("Item 1 Updated");
        item.setPrice(150.0);

        Mockito.when(itemService.getItemById(itemId)).thenReturn(Optional.of(item));
        Mockito.when(itemMapper.toItem(itemDTO)).thenReturn(item);
        Mockito.when(itemService.saveItem(item)).thenReturn(item);
        Mockito.when(itemMapper.toItemDTO(item)).thenReturn(itemDTO);

        this.mockMvc.perform(put("/api/v1/items/{id}", itemId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"code\":\"item001\", \"name\":\"Item 1 Updated\", \"price\":150.0}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code", is("item001")))
                .andExpect(jsonPath("$.name", is("Item 1 Updated")))
                .andExpect(jsonPath("$.price", is(150.0)))
                .andDo(document("update-item"));
    }

    @Test
    public void deleteItem() throws Exception {
        Long itemId = 1L;

        Item item = new Item();
        item.setId(itemId);

        Mockito.when(itemService.getItemById(itemId)).thenReturn(Optional.of(item));

        this.mockMvc.perform(delete("/api/v1/items/{id}", itemId))
                .andExpect(status().isNoContent())
                .andDo(document("delete-item"));
    }
}
