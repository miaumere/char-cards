package com.meowmere.main.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.meowmere.main.dto.user.LoggedUserDTO;
import com.meowmere.main.entities.user.Users;
import com.meowmere.main.repositories.user.UsersRepository;
import com.meowmere.main.requests.user.LoginRequest;
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
import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

@Service
public class UserService {
    @Autowired
    public UsersRepository usersRepository;

    @Value("${alea.secretkey}")
    private String aleaSecretkey;

    @Value("${alea.passKey}")
    private String aleaPassKey;

    public Boolean userLogin(LoginRequest request) {
        try {
            Users foundUser = usersRepository.findUserByUsername(request.getUsername());
            if(foundUser == null) {
                return false;
            }
            String foundUserPassword = foundUser.getPassword().toUpperCase();

            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            String passwordToEncode = request.getPassword() + aleaPassKey;
            byte[] hash = digest.digest(passwordToEncode.getBytes(StandardCharsets.UTF_8));
            String encoded = DatatypeConverter.printHexBinary(hash);
            if(foundUserPassword.equals(encoded)) {
                return true;
            } else

            return foundUserPassword.equals(encoded);
        } catch (NoSuchAlgorithmException e){
            return false;
        }
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

    public Boolean isUserLogged(HttpServletRequest request) {
        Cookie tokenCookie = WebUtils.getCookie(request,"token");
        if(tokenCookie == null) {
            return false;
        }

        try {
            String JWTFromCookie = tokenCookie.getValue();
            Algorithm algorithm = Algorithm.HMAC256(aleaSecretkey);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT jwt = verifier.verify(JWTFromCookie);

            String username = jwt.getSubject();

            Users foundLoggedUser = usersRepository.findUserByUsername(username);
            return foundLoggedUser != null;
        } catch (Exception exception){
            return false;
        }
    }
}
