package com.meowmere.main.Controllers.user;

import com.meowmere.main.Requests.user.LoginRequest;
import com.meowmere.main.Services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
        return this.userService.createJWTToken(loginRequest, response);
    }

    @GetMapping("/relogin")
    public ResponseEntity relogin(HttpServletRequest request) {
        return this.userService.reloginUser(request);
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
