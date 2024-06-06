package com.tellmaster.server.controller;

import com.tellmaster.server.dto.ItemDTO;
import com.tellmaster.server.mapper.ItemMapper;
import com.tellmaster.server.model.Item;
import com.tellmaster.server.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private ItemMapper itemMapper;

    @PostMapping
    public ResponseEntity<ItemDTO> createItem(@RequestBody ItemDTO itemDTO) {
        Item item = itemMapper.toItem(itemDTO);
        Item savedItem = itemService.saveItem(item);
        ItemDTO responseDTO = itemMapper.toItemDTO(savedItem);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO> getItemById(@PathVariable Long id) {
        Optional<Item> item = itemService.getItemById(id);
        return item.map(value -> ResponseEntity.ok(itemMapper.toItemDTO(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<ItemDTO>> getAllItems() {
        List<Item> items = itemService.getAllItems();
        List<ItemDTO> itemDTOs = items.stream().map(itemMapper::toItemDTO).collect(Collectors.toList());
        return ResponseEntity.ok(itemDTOs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemDTO> updateItem(@PathVariable Long id, @RequestBody ItemDTO itemDTO) {
        Optional<Item> itemOptional = itemService.getItemById(id);
        if (itemOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Item item = itemMapper.toItem(itemDTO);
        item.setId(id);
        Item updatedItem = itemService.saveItem(item);
        return ResponseEntity.ok(itemMapper.toItemDTO(updatedItem));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        if (itemService.getItemById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        itemService.deleteItemById(id);
        return ResponseEntity.noContent().build();
    }
}
