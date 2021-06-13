package com.example.doggo.model.service;

import com.example.doggo.model.domain.Dog;
import com.example.doggo.model.repository.DogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DogService {
    private final DogRepository dogRepository;

    public DogService(DogRepository dogRepository) {
        this.dogRepository = dogRepository;
    }

    public List<Dog> getDogs() {
        return dogRepository.findAll();
    }

    public Dog getDog(int id) {
        return dogRepository.getOne(id);
    }

    public Dog addDog(Dog dog) {
        dogRepository.save(dog);
        return dog;
    }

    public void updateDog(Dog dog) {
        for (Dog d : getDogs()) {
            if (d.getId() == dog.getId()) {
                dogRepository.save(dog);
            }
        }
    }

    public void deleteDog(int dogId) {
        dogRepository.delete(getDog(dogId));
    }
}
