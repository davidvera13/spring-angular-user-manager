package com.manager.user.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.File;

import static com.manager.user.app.constant.FileConstant.USER_FOLDER;

@SpringBootApplication
public class UsermanagerBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(UsermanagerBackendApplication.class, args);
        new File(USER_FOLDER).mkdirs();

    }

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
