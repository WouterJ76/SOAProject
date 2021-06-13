package com.example.doggo.controller;

import com.example.doggo.model.dto.DogDTO;
import com.example.doggo.model.service.DogService;
import com.example.doggo.model.domain.Dog;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@Controller
public class DogController{
    DogService dogService;

    public DogController(DogService dogService) {
        this.dogService = dogService;
    }

    @GetMapping("/newdog")
    public String showNewDogForm(Dog dog) {
        return "add-dog";
    }

    @PostMapping("/adddog")
    public String addDog(@Valid DogDTO dog, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "add-dog";
        }

        dogService.addDog(dog);
        return "redirect:/index";
    }

    @GetMapping("/index")
    public String showDogList(Model model) {
        model.addAttribute("dogs", dogService.getDogs());
        return "index";
    }

    @GetMapping("/edit/{id}")
    public String showUpdateForm(@PathVariable("id") int id, Model model) {
        Dog dog = dogService.getDog(id);

        model.addAttribute("dog", dog);
        return "update-dog";
    }

    @PostMapping("/update/{id}")
    public String updateDog(@PathVariable("id") int id, @Valid DogDTO dog,
                             BindingResult result, Model model) {
        if (result.hasErrors()) {
            dog.setId(id);
            return "update-dog";
        }

        dogService.addDog(dog);
        return "redirect:/index";
    }

    @GetMapping("/delete/{id}")
    public String deleteDog(@PathVariable("id") int id, Model model) {
        Dog dog = dogService.getDog(id);
        dogService.deleteDog(id);
        return "redirect:/index";
    }
}
