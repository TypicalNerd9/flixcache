package com.github.typicalnerd9.flixcache.flixcache.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import static java.time.Month.*;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository) {
        return args -> {
            User carlos = new User("cperea", "charly-perea@live.com", LocalDate.of(2002, AUGUST, 19));
            User zeerick = new User("zmalik", "zeerick55@gmail.com", LocalDate.of(2001, APRIL, 13));
            repository.saveAll(List.of(carlos, zeerick));
        };
    }

}
