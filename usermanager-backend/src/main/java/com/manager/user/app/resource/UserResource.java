package com.manager.user.app.resource;

import com.manager.user.app.domain.User;
import com.manager.user.app.exception.AppExceptionHandler;
import com.manager.user.app.exception.domain.EmailExistsException;
import com.manager.user.app.exception.domain.UserNotFoundException;
import com.manager.user.app.exception.domain.UsernameExistsException;
import com.manager.user.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = {"/", "/users"})
public class UserResource extends AppExceptionHandler {
    private UserService userService;

    @Autowired
    public UserResource(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user)
            throws EmailExistsException, UserNotFoundException, UsernameExistsException {
        User newUser = userService.register(user.getFirstName(), user.getLastName(), user.getUserName(), user.getEmail());
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }
    
    private void authenticate(String userName, String password) {
    }
}
