package com.manager.user.app.service.impl;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.manager.user.app.service.LoginAttemptService;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Service
public class LoginAttemptServiceImpl implements LoginAttemptService {
    public static final int MAXIMUM_AUTH_ATTEMPT = 5;
    public static final int AUTH_ATTEMPT_INCREMENT = 1;
    private LoadingCache<String, Integer> loginAttemptCache;

    public LoginAttemptServiceImpl() {
        super();
        // for more details : https://guava.dev/releases/18.0/api/docs/com/google/common/cache/CacheBuilder.html
        // the cache will long 15 minutes
        // the maximum entries depend on the application and number
        // of user that will use it
        loginAttemptCache = CacheBuilder.newBuilder()
                .expireAfterWrite(15, TimeUnit.MINUTES)
                .maximumSize(10000)
                .build(new CacheLoader<>() {
                    @Override
                    public Integer load(String key) {
                        return 0;
                    }
                });
    }

    /**
     * Once the user is logged, we can remove the cache information concerning
     * this user. The method remove the key in the cache and the associated values
     * @param username - stored username in cache
     */
    @Override
    public void evictUserFromLoginAttemptCache(String username) {
        loginAttemptCache.invalidate(username);
    }

    /**
     * this method will add user to the cache if the login fail and will
     * increment the number of attempt
     * @param username - username of the user that attempt to login
     */
    @Override
    public void addUserToLoginAttemptCache(String username) {
        int attempts = 0;
        // we want to count the nuber of attempts. the get retrieve the number of past attempts
        try {
            attempts = AUTH_ATTEMPT_INCREMENT + loginAttemptCache.get(username);
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        loginAttemptCache.put(username, attempts);
    }

    /**
     * Check if the numnber of login attempt reached the maximum value
     * @param username - username of the user that attempt to login
     * @return a boolean which indicates if user can try to login or not
     */
    @Override
    public boolean hasExceededMaxAttempts(String username) {
        try {
            return loginAttemptCache.get(username) >= MAXIMUM_AUTH_ATTEMPT;
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return false;
    }
}
