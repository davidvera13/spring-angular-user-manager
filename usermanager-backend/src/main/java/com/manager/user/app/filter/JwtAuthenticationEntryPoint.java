package com.manager.user.app.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.manager.user.app.constant.SecurityConstant;
import com.manager.user.app.domain.HttpResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;


@Slf4j
@Component
public class JwtAuthenticationEntryPoint extends Http403ForbiddenEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException arg2)
            throws IOException {
        log.debug("Pre-authenticated entry point called. Rejecting access");
        HttpResponse httpResponse =
                new HttpResponse(
                        HttpStatus.FORBIDDEN.value(),
                        HttpStatus.FORBIDDEN,
                        HttpStatus.FORBIDDEN.getReasonPhrase().toUpperCase(),
                        SecurityConstant.FORBIDDEN_MESSAGE,
                        new Date());
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.FORBIDDEN.value());
        OutputStream outputStream = response.getOutputStream();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(outputStream, httpResponse);
        outputStream.flush();
    }
}
