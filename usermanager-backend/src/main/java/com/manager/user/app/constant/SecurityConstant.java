package com.manager.user.app.constant;

public class SecurityConstant {
    public static final Long EXPIRATION_TIME =  432_000_000L; // 5days in ms
    public static final String TOKEN_HEADER = "Bearer ";
    public static final String JWT_TOKEN_HEADER = "Jwt-Token";
    public static final String TOKEN_CANNOT_BE_VERIFIED = "Token cannot be verified";
    public static final String COMPANY_LTD = "My Company";
    public static final String COMPANY_LTD_ADMINISTRATION = "User Management Portal";
    public static final String AUTHORITIES = "Authorities";
    public static final String FORBIDDEN_MESSAGE = " You need to log in to access this page";
    public static final String ACCESS_DENIED = "You don't have permission to access this page";
    public static final String OPTIONS_HTTP_METHOD = "OPTIONS";
    public static final String[] PUBLIC_URLS = {
            "/users/login",
            "users/register",
            "users/resetpassword/**",
            "users/images/**"
    };
}
