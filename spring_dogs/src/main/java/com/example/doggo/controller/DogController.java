package com.example.doggo.controller;

import com.example.doggo.model.service.DogService;
import com.example.doggo.model.entity.Dog;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@Controller
public class DogController{
    DogService dogService = new DogService() ;

    @GetMapping("/newdog")
    public String showNewDogForm(Dog dog) {
        return "add-dog";
    }

    @PostMapping("/adddog")
    public String addDog(@Valid Dog dog, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "add-dog";
        }

        dogService.save(dog);
        return "redirect:/index";
    }

    @GetMapping("/index")
    public String showDogList(Model model) {
        model.addAttribute("dogs", dogService.findAll());
        return "index";
    }

    @GetMapping("/edit/{id}")
    public String showUpdateForm(@PathVariable("id") long id, Model model) {
        Dog dog = dogService.findById(id);

        model.addAttribute("dog", dog);
        return "update-dog";
    }

    @PostMapping("/update/{id}")
    public String updateDog(@PathVariable("id") long id, @Valid Dog dog,
                             BindingResult result, Model model) {
        if (result.hasErrors()) {
            dog.setId(id);
            return "update-dog";
        }

        dogService.save(dog);
        return "redirect:/index";
    }

    @GetMapping("/delete/{id}")
    public String deleteDog(@PathVariable("id") long id, Model model) {
        Dog dog = dogService.findById(id);
        dogService.delete(id);
        return "redirect:/index";
    }
}
