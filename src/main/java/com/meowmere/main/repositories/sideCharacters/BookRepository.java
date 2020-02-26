package com.meowmere.main.repositories.sideCharacters;

import com.meowmere.main.entities.sideCharacters.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository  extends JpaRepository<Book, Long> {
}
