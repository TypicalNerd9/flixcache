package com.github.typicalnerd9.flixcache.flixcache.flix;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/flix")
public class FlixController {

    private final FlixService flixService;

    @Autowired
    public FlixController(FlixService flixService) {
        this.flixService = flixService;
    }

    @GetMapping("/trending")
    public String getTrending(@RequestParam(name = "type") String type, @RequestParam(name = "timeframe") String timeframe) {
        return flixService.getTrending(type, timeframe);
    }

    @GetMapping("/config")
    public String getConfig() {
        return flixService.getConfig();
    }

    @GetMapping("/search")
    public String getSearch(@RequestParam(name= "type", defaultValue = "movies") String type, @RequestParam(name= "query") String query, @RequestParam(name= "page") Integer page) {
        return flixService.getSearch(type, query, page);
    }
}
