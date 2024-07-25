package com.github.typicalnerd9.flixcache.flixcache.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public void addNewUser(User newUser) {
        if (userRepository.findUserByEmail(newUser.getEmail()).isPresent()) {
            throw new IllegalStateException("email taken");
        }
        userRepository.save(newUser);
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
}
