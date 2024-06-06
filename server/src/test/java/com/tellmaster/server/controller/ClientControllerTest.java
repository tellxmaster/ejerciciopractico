package com.tellmaster.server.controller;

import com.tellmaster.server.dto.ClientDTO;
import com.tellmaster.server.mapper.ClientMapper;
import com.tellmaster.server.model.Client;
import com.tellmaster.server.service.ClientService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;

@WebMvcTest(ClientController.class)
@ExtendWith(RestDocumentationExtension.class)
public class ClientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClientService clientService;

    @MockBean
    private ClientMapper clientMapper;

    @BeforeEach
    public void setup(WebApplicationContext webApplicationContext,
                      RestDocumentationContextProvider restDocumentation) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(documentationConfiguration(restDocumentation))
                .build();
    }

    @Test
    public void createClient() throws Exception {
        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setName("John");
        clientDTO.setLastname("Doe");

        Client client = new Client();
        client.setName("John");
        client.setLastname("Doe");

        Mockito.when(clientMapper.toClient(clientDTO)).thenReturn(client);
        Mockito.when(clientService.saveClient(client)).thenReturn(client);
        Mockito.when(clientMapper.toClientDTO(client)).thenReturn(clientDTO);

        this.mockMvc.perform(post("/api/v1/clients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"John\", \"lastname\":\"Doe\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("John")))
                .andExpect(jsonPath("$.lastname", is("Doe")))
                .andDo(document("create-client"));
    }


    @Test
    public void getClientById() throws Exception {
        Long clientId = 1L;
        Client client = new Client();
        client.setId(clientId);
        client.setName("John Doe");

        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setId(clientId);
        clientDTO.setName("John Doe");

        Mockito.when(clientService.getClientById(clientId)).thenReturn(Optional.of(client));
        Mockito.when(clientMapper.toClientDTO(client)).thenReturn(clientDTO);

        this.mockMvc.perform(get("/api/v1/clients/{id}", clientId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("John Doe")))
                .andDo(document("get-client-by-id"));
    }

    @Test
    public void getAllClients() throws Exception {
        Client client1 = new Client();
        client1.setId(1L);
        client1.setName("John Doe");

        Client client2 = new Client();
        client2.setId(2L);
        client2.setName("Jane Doe");

        ClientDTO clientDTO1 = new ClientDTO();
        clientDTO1.setId(1L);
        clientDTO1.setName("John Doe");

        ClientDTO clientDTO2 = new ClientDTO();
        clientDTO2.setId(2L);
        clientDTO2.setName("Jane Doe");

        Mockito.when(clientService.getAllClients()).thenReturn(Arrays.asList(client1, client2));
        Mockito.when(clientMapper.toClientDTO(client1)).thenReturn(clientDTO1);
        Mockito.when(clientMapper.toClientDTO(client2)).thenReturn(clientDTO2);

        this.mockMvc.perform(get("/api/v1/clients"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name", is("John Doe")))
                .andExpect(jsonPath("$[1].name", is("Jane Doe")))
                .andDo(document("get-all-clients"));
    }

    @Test
    public void updateClient() throws Exception {
        Long clientId = 1L;
        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setName("John Doe Updated");

        Client client = new Client();
        client.setId(clientId);
        client.setName("John Doe Updated");

        Mockito.when(clientService.getClientById(clientId)).thenReturn(Optional.of(client));
        Mockito.when(clientMapper.toClient(clientDTO)).thenReturn(client);
        Mockito.when(clientService.saveClient(client)).thenReturn(client);
        Mockito.when(clientMapper.toClientDTO(client)).thenReturn(clientDTO);

        this.mockMvc.perform(put("/api/v1/clients/{id}", clientId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"John Doe Updated\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("John Doe Updated")))
                .andDo(document("update-client"));
    }

    @Test
    public void deleteClient() throws Exception {
        Long clientId = 1L;

        Client client = new Client();
        client.setId(clientId);

        Mockito.when(clientService.getClientById(clientId)).thenReturn(Optional.of(client));

        this.mockMvc.perform(delete("/api/v1/clients/{id}", clientId))
                .andExpect(status().isNoContent())
                .andDo(document("delete-client"));
    }
}
