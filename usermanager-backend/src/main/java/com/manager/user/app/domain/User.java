package com.manager.user.app.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String userKeyId;
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String profileImageUrl;
    private Date lastLoginDate;
    private Date lastLoginDateDisplay;
    private Date createdAt;

    // for security
    private String roles;         // ROLE_USER(read, update...), ROLE_ADMIN (delete...)
    private String[] authorities;   // create, update...
    private boolean isActive;
    private boolean isNotLocked;
}
