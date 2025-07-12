package com.ciencias_arreguin.arreguin.mappers;

import com.ciencias_arreguin.arreguin.dtos.AsesoresDTO;
import com.ciencias_arreguin.arreguin.models.Asesores;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.IterableMapping;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AsesoresMapper {

    @Named("toDTOWithoutPassword")
    @Mapping(target = "contrasenaAsesor", ignore = true)
    AsesoresDTO toDTO(Asesores asesor);

    @Mapping(target = "listaAsesorParticipacion", ignore = true)
    Asesores toEntity(AsesoresDTO asesorDTO);

    @IterableMapping(qualifiedByName = "toDTOWithoutPassword")
    List<AsesoresDTO> toDTOList(List<Asesores> asesores);
    
    @Mapping(target = "listaAsesorParticipacion", ignore = true)
    List<Asesores> toEntityList(List<AsesoresDTO> asesoresDTO);

    @Mapping(target = "idAsesor", ignore = true)
    @Mapping(target = "listaAsesorParticipacion", ignore = true)
    void updateEntityFromDTO(AsesoresDTO asesorDTO, @MappingTarget Asesores asesor);

    @Named("toDTOWithPassword")
    AsesoresDTO toDTOWithPassword(Asesores asesor);
}