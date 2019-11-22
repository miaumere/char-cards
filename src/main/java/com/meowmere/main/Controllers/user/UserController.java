package com.meowmere.main.Controllers.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.meowmere.main.Requests.user.LoginRequest;
import com.meowmere.main.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@RestController
@RequestMapping
public class UserController {
    @Autowired
    public UserService userService;

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        Boolean loginSuccess = this.userService.userLogin(loginRequest);

        if(loginSuccess == false) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String token = "";
        try {
            Algorithm algorithm = Algorithm.HMAC256("secretSecretsecretSecretSecretBardzoSecret");
            Long date = System.currentTimeMillis() + 7 * 24 * 3600 * 1000;
//            nowy kontroler GET wysyłający nagłówek “Bearer”: JWT token
//            + backend sprawdza czy token jest prawidłowy i czy nie wygasł
//            jak nie wygasł - taki sam ale odświeżony (wygasający za kolejne 7 dni) - inaczej 403
            // kiedy utworzone, kiedy wygasa (za 7 dni od utworzenia, )

            token = JWT.create()
                    .withClaim("name", loginRequest.getUsername())
                    .withExpiresAt(new Date(date))
                    .sign(algorithm);
        } catch (JWTCreationException exception){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(7 * 24 * 3600 * 1000);
        response.addCookie(cookie);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie tokenCookie = WebUtils.getCookie(request,"token");
        if(tokenCookie == null) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        tokenCookie.setMaxAge(0);
        response.addCookie(tokenCookie);
    return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
