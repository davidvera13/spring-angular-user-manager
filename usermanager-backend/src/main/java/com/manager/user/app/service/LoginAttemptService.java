package com.manager.user.app.service;

public interface LoginAttemptService {
    void evictUserFromLoginAttemptCache(String username);
    void addUserToLoginAttemptCache(String username);
    boolean hasExceededMaxAttempts(String username);
}
