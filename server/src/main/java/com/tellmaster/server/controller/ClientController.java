package com.tellmaster.server.controller;

import com.tellmaster.server.dto.ClientDTO;
import com.tellmaster.server.mapper.ClientMapper;
import com.tellmaster.server.model.Client;
import com.tellmaster.server.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private ClientMapper clientMapper;

    @PostMapping
    public ResponseEntity<ClientDTO> createClient(@RequestBody ClientDTO clientDTO) {
        Client client = clientMapper.toClient(clientDTO);
        Client savedClient = clientService.saveClient(client);
        ClientDTO responseDTO = clientMapper.toClientDTO(savedClient);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> getClientById(@PathVariable Long id) {
        Optional<Client> client = clientService.getClientById(id);
        return client.map(value -> ResponseEntity.ok(clientMapper.toClientDTO(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<ClientDTO>> getAllClients() {
        List<Client> clients = clientService.getAllClients();
        List<ClientDTO> clientDTOs = clients.stream().map(clientMapper::toClientDTO).collect(Collectors.toList());
        return ResponseEntity.ok(clientDTOs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientDTO> updateClient(@PathVariable Long id, @RequestBody ClientDTO clientDTO) {
        Optional<Client> clientOptional = clientService.getClientById(id);
        if (clientOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Client client = clientMapper.toClient(clientDTO);
        client.setId(id);
        Client updatedClient = clientService.saveClient(client);
        return ResponseEntity.ok(clientMapper.toClientDTO(updatedClient));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        if (clientService.getClientById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        clientService.deleteClientById(id);
        return ResponseEntity.noContent().build();
    }
}
