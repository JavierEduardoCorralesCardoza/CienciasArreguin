package com.ciencias_arreguin.arreguin.mappers;

import com.ciencias_arreguin.arreguin.dtos.EventosDTO;
import com.ciencias_arreguin.arreguin.models.Eventos;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface EventosMapper {

    EventosDTO toDTO(Eventos evento);

    @Mapping(target = "listaEventoParticipacion", ignore = true)
    Eventos toEntity(EventosDTO eventoDTO);

    List<EventosDTO> toDTOList(List<Eventos> eventos);
    
    List<Eventos> toEntityList(List<EventosDTO> eventosDTO);

    @Mapping(target = "idEvento", ignore = true)
    @Mapping(target = "listaEventoParticipacion", ignore = true)
    void updateEntityFromDTO(EventosDTO eventoDTO, @MappingTarget Eventos evento);
}