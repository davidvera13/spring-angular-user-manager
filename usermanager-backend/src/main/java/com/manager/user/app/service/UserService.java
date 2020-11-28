package com.manager.user.app.service;

import com.manager.user.app.domain.User;
import com.manager.user.app.exception.domain.EmailExistsException;
import com.manager.user.app.exception.domain.UserNotFoundException;
import com.manager.user.app.exception.domain.UsernameExistsException;

import java.util.List;

public interface UserService {
    User register(String firstName, String lastName, String userName, String email) throws UserNotFoundException, UsernameExistsException, EmailExistsException;
    List<User> getUsers();
    User findUserByUsername(String username);
    User findUserByEmail(String email);
}
