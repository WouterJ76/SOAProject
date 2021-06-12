package com.example.doggo.model.service;

import com.example.doggo.model.entity.Dog;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class DogService {
    private Map<Long, Dog> dogs = new HashMap<Long, Dog>();
    
    public DogService() {
    }

    public void save(Dog d){
        dogs.put(d.getId(), d);
    }
    public void update(Dog d){
        dogs.put(d.getId(), d);
    }
    public void delete(long id){
        dogs.remove(id);
    }
    public Dog findById(long id){
        return dogs.get(id);
    }
    public List<Dog> findAll(){
        return new ArrayList<Dog>(dogs.values());
    }
}
