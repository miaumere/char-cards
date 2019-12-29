package com.meowmere.main.Repositories.sideCharacters;

import com.meowmere.main.Entities.sideCharacters.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository  extends JpaRepository<Book, Long> {
}
