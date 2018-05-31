package com.bookstore.controller;


import com.bookstore.entity.Author;
import com.bookstore.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api")
public class AuthorController {

    @Autowired
    AuthorRepository authorRepository;

    @GetMapping("/authors")
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }


    @PostMapping("/addAuthor")
    public Author createAuthor(@Valid @RequestBody Author author) {

        return authorRepository.save(author);
    }

    @GetMapping("/getAuthorsById/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable(value = "id") int authorId) {
        Author author = authorRepository.findOne(authorId);
        if(author == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(author);
    }


    @PutMapping("/updateAuthor/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable(value = "id") int authorId,
                                           @Valid @RequestBody Author authorDetails) {
        Author author = authorRepository.findOne(authorId);
        if(author == null) {
            return ResponseEntity.notFound().build();
        }
        author.setName(authorDetails.getName());


        Author updatedAuthor = authorRepository.save(author);
        return ResponseEntity.ok(updatedAuthor);
    }


    @DeleteMapping("/deleteAuthors/{id}")
    public ResponseEntity<Author> deleteAuthor(@PathVariable(value = "id") int authorId) {
        Author author = authorRepository.findOne(authorId);
        if(author == null) {
            return ResponseEntity.notFound().build();
        }
        else {
            authorRepository.delete(author);
        }
        return ResponseEntity.ok().build();
    }

}
