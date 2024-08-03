package com.github.typicalnerd9.flixcache.flixcache.cache;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/cache")
public class CacheController {

    private final CacheService cacheService;

    @Autowired
    public CacheController(CacheService cacheService) {
        this.cacheService = cacheService;
    }

    @GetMapping
    public List<Cache> getCaches() {
        return cacheService.getCaches();
    }

    @PostMapping
    public void createCache(@RequestBody Cache newCache) {
        cacheService.createCache(newCache);
    }
}
