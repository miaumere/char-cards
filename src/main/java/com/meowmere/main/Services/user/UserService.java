package com.meowmere.main.Services.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.meowmere.main.DTO.user.LoggedUserDTO;
import com.meowmere.main.Entities.user.Users;
import com.meowmere.main.Repositories.user.UsersRepository;
import com.meowmere.main.Requests.user.LoginRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@Service
public class UserService {
    @Autowired
    public UsersRepository usersRepository;

    @Value("${alea.secretkey}")
    private String aleaSecretkey;

    public Boolean userLogin(LoginRequest request) {
        Users foundUser = usersRepository.findUserByUsernameAndPassword(request.getUsername(), request.getPassword());
        return foundUser != null;
    }

    public ResponseEntity createJWTToken(LoginRequest loginRequest, HttpServletResponse response) {
        String token = "";
        try {
            Algorithm algorithm = Algorithm.HMAC256(aleaSecretkey);
            Long date = System.currentTimeMillis() + 7 * 24 * 3600 * 1000;
            token = JWT.create()
                    .withSubject(loginRequest.getUsername())
                    .withExpiresAt(new Date(date))
                    .sign(algorithm);
        } catch (JWTCreationException exception){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(604800);
        response.addCookie(cookie);
        return new ResponseEntity(loginRequest, HttpStatus.ACCEPTED);
    }

    public ResponseEntity reloginUser(HttpServletRequest request) {
        Cookie tokenCookie = WebUtils.getCookie(request,"token");
        ModelMapper modelMapper = new ModelMapper();
        if(tokenCookie == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        try {
            String JWTFromCookie = tokenCookie.getValue();
            Algorithm algorithm = Algorithm.HMAC256(aleaSecretkey);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT jwt = verifier.verify(JWTFromCookie);

            String username = jwt.getSubject();

            Users foundLoggedUser = usersRepository.findUserByUsername(username);
            LoggedUserDTO loggedUser = modelMapper.map(foundLoggedUser, LoggedUserDTO.class);
            return new ResponseEntity(loggedUser, HttpStatus.ACCEPTED);
        } catch (Exception exception){}

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
