package com.github.typicalnerd9.flixcache.flixcache.user;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private LocalDate dob;
    private List<Long> caches;
    private List<Long> reviews;
    private List<Integer> watched;

    public User() {
    }

    public User(Long id, String username, String email, LocalDate dob) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.dob = dob;
    }

    public User(String username, String email, LocalDate dob) {
        this.username = username;
        this.email = email;
        this.dob = dob;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", dob=" + dob +
                '}';
    }
}
