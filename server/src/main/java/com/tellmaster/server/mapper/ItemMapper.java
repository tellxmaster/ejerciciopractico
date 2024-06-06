package com.tellmaster.server.mapper;

import com.tellmaster.server.dto.ItemDTO;
import com.tellmaster.server.model.Item;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ItemMapper {
    ItemMapper INSTANCE = Mappers.getMapper(ItemMapper.class);

    ItemDTO toItemDTO(Item item);
    Item toItem(ItemDTO itemDTO);
}
