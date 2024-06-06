package com.tellmaster.server.service;

import com.tellmaster.server.model.Client;
import com.tellmaster.server.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    public Optional<Client> getClientById(Long id) {
        return clientRepository.findById(id);
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public void deleteClientById(Long id) {
        clientRepository.deleteById(id);
    }

    public void deleteClient(Client client) {
        clientRepository.delete(client);
    }
}
