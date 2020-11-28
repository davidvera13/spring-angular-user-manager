package com.manager.user.app.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.Date;

@Getter @Setter
@NoArgsConstructor
public class HttpResponse {
    private int httpStatusCode;
    private HttpStatus httpStatus;
    private String reason;
    private String message;
    @JsonFormat(
            shape = JsonFormat.Shape.STRING,
            pattern = "yyyy-MM-dd hh:mm:ss",
            timezone="Europe/Paris"
    )
    private Date timeStamp;

    public HttpResponse(int httpStatusCode,
                        HttpStatus httpStatus,
                        String reason,
                        String message,
                        Date timeStamp) {
        this.httpStatusCode = httpStatusCode;
        this.httpStatus = httpStatus;
        this.reason = reason;
        this.message = message;
        this.timeStamp = timeStamp;
    }

    public HttpResponse(int httpStatusCode, HttpStatus httpStatus, String toUpperCase, String message) {
        this.httpStatusCode = httpStatusCode;
        this.httpStatus = httpStatus;
        this.reason = reason;
        this.message = message;
        this.timeStamp = new Date();
    }
}
