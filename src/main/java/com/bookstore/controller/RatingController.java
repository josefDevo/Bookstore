package com.bookstore.controller;

import com.bookstore.entity.Rating;
import com.bookstore.repository.RatingRepository;
import com.oracle.webservices.internal.api.message.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class RatingController {

    @Autowired
    RatingRepository ratingRepository;

    @GetMapping("/ratings")
    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }

    @GetMapping("/ratingsById/{id}")
    public List<Map<ContentType, Rating>> getRatingsById(@PathVariable(value = "id") int id){
        return ratingRepository.getRatingsById(id);
    }


    @PostMapping("/addRating")
    public Rating createRating(@Valid @RequestBody Rating rating) {
        return ratingRepository.save(rating);
    }

    /*
    @GetMapping("/getBooksById/{id}")
    public ResponseEntity<Rating> getBooksById(@PathVariable(value = "id") int bookId) {
        Rating rating = ratingRepository.findOne(bookId);
        if(rating == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(rating);

        */
    }