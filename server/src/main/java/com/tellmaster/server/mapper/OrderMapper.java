package com.tellmaster.server.mapper;

import com.tellmaster.server.dto.OrderDTO;
import com.tellmaster.server.model.CustomerOrder;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    OrderDTO toOrderDTO(CustomerOrder customerOrder);
    CustomerOrder toOrder(OrderDTO orderDTO);
}
