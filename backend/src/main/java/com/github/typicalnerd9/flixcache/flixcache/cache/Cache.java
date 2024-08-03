package com.github.typicalnerd9.flixcache.flixcache.cache;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table
public class Cache {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private List<Integer> flix;

}
