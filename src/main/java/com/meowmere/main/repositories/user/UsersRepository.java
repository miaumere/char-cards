package com.meowmere.main.repositories.user;

import com.meowmere.main.entities.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    @Query("SELECT u FROM Users u WHERE u.username = :username AND u.password = :password")
    Users findUserByUsernameAndPassword(@Param("username") String username, @Param("password") byte[] password);

    @Query("SELECT u FROM Users u WHERE u.username = :username")
    Users findUserByUsername(@Param("username") String username);
}
