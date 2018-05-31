package com.bookstore.controller;

import com.bookstore.entity.Book;
import com.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api")
public class BookController {


    @Autowired
    BookRepository bookRepository;

    // Get All Books
    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // "Buying new book to the store"
    @PostMapping("/addBook")
    public Book createBook(@Valid @RequestBody Book book) {
        return bookRepository.save(book);
    }

    // Find book
    @GetMapping("/getBookById/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable(value = "id") int id) {
        Book locateBook = bookRepository.findOne(id);
        if (locateBook == null) {

            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(locateBook);
    }


    // update book
    @PutMapping("/updateBook/{bookID}")

    public ResponseEntity<Book> updateBook(@PathVariable(value = "bookID") int bookID,
                                           @Valid @RequestBody Book bookDetails) {
        Book book = bookRepository.findOne(bookID);
        if(book == null) {
            return ResponseEntity.notFound().build();
        }
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setGenre(bookDetails.getGenre());
        book.setPublishedYear(bookDetails.getPublishedYear());
        book.setPrice(bookDetails.getPrice());
        book.setInventory(bookDetails.getInventory());
        book.setAuthorId(bookDetails.getAuthorId());

        Book updatedBook = bookRepository.save(book);
        return ResponseEntity.ok(updatedBook);

    }

    // delete book
    @DeleteMapping("/deleteBooks/{bookID}")

    public ResponseEntity<Book> deleteBook(@PathVariable(value = "bookID") int bookID) {
        Book deleteBook = bookRepository.findOne(bookID);
        if (deleteBook == null) {

            return ResponseEntity.notFound().build();
        } else {

            bookRepository.delete(deleteBook);
        }
        return ResponseEntity.ok().build();
    }
}
