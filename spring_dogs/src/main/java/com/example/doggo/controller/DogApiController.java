package com.example.doggo.controller;

import com.example.doggo.model.domain.Dog;
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
        List<Dog> dogs = dogService.getDogs();
        return new ResponseEntity<>(dogs, HttpStatus.OK);
    }

    @GetMapping({"/{dogId}"})
    public ResponseEntity<Dog> getDogById(@PathVariable int dogId) {
        return new ResponseEntity<>(dogService.getDog(dogId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Dog> saveDog(@RequestBody Dog dog) {
        Dog dog1 = dogService.addDog(dog);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("dog", "/dog/" + dog.getId());
        return new ResponseEntity<>(dog1, httpHeaders, HttpStatus.CREATED);
    }

    @PutMapping({"/{dogId}"})
    public ResponseEntity<Dog> updateDog(@PathVariable("dogId") int dogId, @RequestBody Dog dog) {
        dogService.updateDog(dog);
        return new ResponseEntity<>(dogService.getDog(dogId), HttpStatus.OK);
    }

    @DeleteMapping({"/{dogId}"})
    public ResponseEntity<Dog> deleteDog(@PathVariable("dogId") int dogId) {
        dogService.deleteDog(dogId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
