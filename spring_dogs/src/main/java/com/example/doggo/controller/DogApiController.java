package com.example.doggo.controller;

import com.example.doggo.model.entity.Dog;
import com.example.doggo.model.service.DogService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dogs/")
public class DogApiController{
    DogService dogService;

    public DogApiController(DogService dogService) {
        this.dogService = dogService;
    }

    @GetMapping
    public ResponseEntity<List<Dog>> getAllDogs() {
        List<Dog> dogs = dogService.findAll();
        return new ResponseEntity<>(dogs, HttpStatus.OK);
    }

    @GetMapping({"/{dogId}"})
    public ResponseEntity<Dog> getDogById(@PathVariable Long dogId) {
        return new ResponseEntity<>(dogService.findById(dogId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Dog> saveDog(@RequestBody Dog dog) {
        Dog dog1 = dogService.save(dog);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("dog", "/dog/" + dog.getId());
        return new ResponseEntity<>(dog1, httpHeaders, HttpStatus.CREATED);
    }

    @PutMapping({"/{dogId}"})
    public ResponseEntity<Dog> updateDog(@PathVariable("dogId") Long dogId, @RequestBody Dog dog) {
        dogService.update(dog);
        return new ResponseEntity<>(dogService.findById(dogId), HttpStatus.OK);
    }

    @DeleteMapping({"/{dogId}"})
    public ResponseEntity<Dog> deleteDog(@PathVariable("dogId") Long dogId) {
        dogService.delete(dogId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
