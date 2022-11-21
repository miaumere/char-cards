package com.meowmere.main.requests.user;

import lombok.Getter;
import lombok.Setter;

public class LoginRequest {
    @Getter
    @Setter
    private String username;
    @Getter
    @Setter
    private String password;


}
