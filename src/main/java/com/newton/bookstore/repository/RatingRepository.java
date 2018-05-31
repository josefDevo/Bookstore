package com.newton.bookstore.repository;

import com.newton.bookstore.entity.Rating;
import com.oracle.webservices.internal.api.message.ContentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {

    @Query("SELECT r.star FROM Rating r WHERE r.bookId = :id")
    List<Map<ContentType, Rating>> getRatingsById(@Param("id") int id);

}
