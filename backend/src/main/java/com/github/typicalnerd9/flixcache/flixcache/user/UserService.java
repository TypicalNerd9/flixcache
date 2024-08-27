package com.github.typicalnerd9.flixcache.flixcache.user;

import com.github.typicalnerd9.flixcache.flixcache.security.JWTService;
import com.github.typicalnerd9.flixcache.flixcache.security.UserPrincipal;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public boolean addNewUser(User newUser) {
        if (userRepository.findUserByEmail(newUser.getEmail()).isPresent()) {
            return false;
        }
        newUser.setPassword(encoder.encode(newUser.getPassword()));
        userRepository.save(newUser);
        return true;
    }

    public void deleteUser(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
        } else {
            throw new IllegalStateException("user with id " + userId + " does not exist");
        }
    }

    @Transactional
    public void updateUser(Long userId, String username, String email) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalStateException("student with id " + userId + "does not exist"));

        if (username != null && username.length() > 0 && !Objects.equals(user.getUsername(), username)) {
            user.setUsername(username);
        }

        if (email != null && email.length() > 0 && !Objects.equals(user.getEmail(), email)) {
            if (userRepository.findUserByEmail(email).isPresent()) {
                throw new IllegalStateException("email taken");
            }
            user.setEmail(email);
        }
    }

    public String verify(User user, HttpServletResponse res) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(authentication);
            ResponseCookie resCookie = ResponseCookie.from("JWT_TOKEN", token)
                    .httpOnly(true)
                    .path("/")
                    .build();
            res.addHeader("Set-Cookie", resCookie.toString());
            return token;
        }
        return "Fail";
    }


    public void logout(HttpServletResponse res) {
        ResponseCookie resCookie = ResponseCookie.from("JWT_TOKEN", null)
                .maxAge(0)
                .httpOnly(true)
                .path("/")
                .build();
        res.addHeader("Set-Cookie", resCookie.toString());
    }
}
