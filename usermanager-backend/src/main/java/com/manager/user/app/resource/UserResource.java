package com.manager.user.app.resource;

import com.manager.user.app.exception.AppExceptionHandler;
import com.manager.user.app.exception.domain.EmailExistsException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = {"/", "/users"})
public class UserResource extends AppExceptionHandler {

    @GetMapping("/home")
    public String showUser() throws EmailExistsException {
        // throw new EmailExistsException("This email address is already taken");
        return "application Works";
    }

}
