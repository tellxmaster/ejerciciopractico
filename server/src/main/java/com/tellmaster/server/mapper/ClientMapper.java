package com.tellmaster.server.mapper;

import com.tellmaster.server.dto.ClientDTO;
import com.tellmaster.server.model.Client;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ClientMapper {
    ClientMapper INSTANCE = Mappers.getMapper(ClientMapper.class);

    ClientDTO toClientDTO(Client client);
    Client toClient(ClientDTO clientDTO);
}
