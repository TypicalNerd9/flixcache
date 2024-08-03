package com.github.typicalnerd9.flixcache.flixcache.cache;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CacheRepository extends JpaRepository<Cache, Long> {

   // Optional<Cache> findCacheByName(String name);
}
