package com.meowmere.main.repositories.story;

import com.meowmere.main.entities.story.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository  extends JpaRepository<Book, Long> {

    @Query("select b from Book b where b.externalId in (select c.book.externalId from Chapter c where c.externalId in (select sc.chapter.externalId from StarringCharacters sc where sc.character.externalId = :charId)) order by b.bookOrder")
    List<Book> getNonEmptyBooksForCharacter(@Param("charId") Long charId);
}
