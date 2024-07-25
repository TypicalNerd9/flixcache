package com.github.typicalnerd9.flixcache.flixcache.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }



    @PostMapping
    public void registerUser(@RequestBody User newUser) {
        userService.addNewUser(newUser);
    }

    @DeleteMapping(path = "{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
    }

    @PutMapping(path = "{userId}")
    public void updateUser(@PathVariable("userId") Long userId, @RequestParam(required = false) String username, @RequestParam(required = false) String email) {
        userService.updateUser(userId, username, email);
    }

}
