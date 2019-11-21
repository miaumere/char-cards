package com.meowmere.main.services.user;

import com.meowmere.main.Requests.user.LoginRequest;
import com.meowmere.main.Entities.user.Users;
import com.meowmere.main.Repositories.user.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    public UsersRepository usersRepository;

    public Boolean userLogin(LoginRequest request) {
        Users foundUser = usersRepository.findUserByUsernameAndPassword(request.getUsername(), request.getPassword());
        if(foundUser != null) {
            return true;
        } else {
            return false;
        }
    }
}
