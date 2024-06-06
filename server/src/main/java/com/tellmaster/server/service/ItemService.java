package com.tellmaster.server.service;

import com.tellmaster.server.model.Client;
import com.tellmaster.server.model.Item;
import com.tellmaster.server.repository.ClientRepository;
import com.tellmaster.server.repository.ItemRepository;
import com.tellmaster.server.utils.CodeGeneratorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    public Item saveItem(Item item) {
        if (item.getCode() == null || item.getCode().isEmpty()) {
            int itemCount = (int) itemRepository.count();
            item.setCode(CodeGeneratorUtil.generateCode("ITM-", itemCount + 1));
        }
        return itemRepository.save(item);
    }

    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public void deleteItemById(Long id) {
        itemRepository.deleteById(id);
    }

    public void deleteItem(Item item) {
        itemRepository.delete(item);
    }
}
