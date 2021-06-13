package com.example.doggo.model.service;

import com.example.doggo.model.domain.Dog;
import com.example.doggo.model.repository.DogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        Optional<Dog> optionalDogFromDb = dogRepository.findById(id);
        return optionalDogFromDb.orElseGet(Dog::new);
    }

    public Dog addDog(Dog dog) {
        dogRepository.save(dog);
        return dog;
    }

    public void updateDog(Dog dog) {
        Dog dogFromDb = getDog(dog.getId());
        dogFromDb.setName(dog.getName());
        dogFromDb.setBreed(dog.getBreed());
        dogRepository.save(dogFromDb);
    }

    public void deleteDog(int dogId) {
        dogRepository.delete(getDog(dogId));
    }
}
