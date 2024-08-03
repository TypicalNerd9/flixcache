package com.github.typicalnerd9.flixcache.flixcache.cache;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CacheService {

    private final CacheRepository cacheRepository;

    @Autowired
    public CacheService(CacheRepository cacheRepository) {
        this.cacheRepository = cacheRepository;
    }

    public List<Cache> getCaches() {
        return cacheRepository.findAll();
    }

    public void createCache(Cache newCache) {
        cacheRepository.save(newCache);
    }
}
