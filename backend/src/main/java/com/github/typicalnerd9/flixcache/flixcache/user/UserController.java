package com.github.typicalnerd9.flixcache.flixcache.user;

import com.github.typicalnerd9.flixcache.flixcache.security.UserPrincipal;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping(path = "/user")
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


    @GetMapping("/verify")
    public boolean isLoggedIn(Principal user) {
        if (user == null) return false;

        return true;
    }

    @PostMapping("/register")
    public boolean registerUser(@RequestBody User newUser) {
        return userService.addNewUser(newUser);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user, HttpServletResponse res) {
        return userService.verify(user, res);
    }

    @PostMapping("/logout")
    public void logoutUser(HttpServletResponse res) {
        userService.logout(res);
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
