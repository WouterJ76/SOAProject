package com.example.doggo.model.service;

import com.example.doggo.model.domain.Dog;
import com.example.doggo.model.dto.DogDTO;
import com.example.doggo.model.repository.DogRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DogService {
    private final DogRepository dogRepository;

    public DogService(DogRepository dogRepository) {
        this.dogRepository = dogRepository;
    }

    public List<DogDTO> getDogs() {
        return dogRepository.findAll().stream().map(t -> {
            DogDTO dto = new DogDTO();
            dto.setId(t.getId());
            dto.setName(t.getName());
            dto.setBreed(t.getBreed());
            return dto;
        }).collect(Collectors.toList());
    }

    public Dog getDog(int id) {
        return dogRepository.getOne(id);
    }

    public Dog addDog(DogDTO dogDTO) {
        Dog dog = new Dog();
        dog.setName(dogDTO.getName());
        dog.setBreed(dogDTO.getBreed());
        dogRepository.save(dog);
        return dog;
    }

    public void updateDog(DogDTO dogDTO) {
        for (DogDTO d : getDogs()) {
            if (d.getId() == dogDTO.getId()) {
                Dog dog = dogRepository.getOne(d.getId());
                dog.setName(dogDTO.getName());
                dog.setBreed(dogDTO.getBreed());
                dogRepository.save(dog);
            }
        }
    }

    public void deleteDog(int dogId) {
        Dog dog = new Dog();
        for (DogDTO d : getDogs()) {
            if (d.getId() == dogId) {
                dog = dogRepository.getOne(dogId);
            }
        }
        dogRepository.delete(dog);
    }
}
