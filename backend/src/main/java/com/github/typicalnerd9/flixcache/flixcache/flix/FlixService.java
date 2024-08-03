package com.github.typicalnerd9.flixcache.flixcache.flix;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class FlixService {

    private final RestClient restClient;

    public FlixService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl("https://api.themoviedb.org/3")
                .defaultHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGJjMzMyOGM3MjA1MTBjMTg1N2ZlOGNhYTEzYzAwYyIsIm5iZiI6MTcyMjQ1MjI3MS4yMjU3NTIsInN1YiI6IjY2YTkzMDA4NzQ4Y2EyNGZiMzVjNDlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LeMd7YhLLJCRnuleXWREyVRObX6F7x-Aw1fRlkiq5vc")
                .build();
    }

    public String getTrending(String type, String timeframe) {
        final String safeTimeframe = (!timeframe.equals("day") && !timeframe.equals("week")) ? timeframe : "day";
        return switch (type) {
            case "movies" -> this.restClient.get().uri("/trending/movie/"+ safeTimeframe)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(String.class);
            case "shows" -> this.restClient.get().uri("/trending/tv/"+ safeTimeframe)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(String.class);
            default -> "";
        };
    }

    public String getConfig() {
        return this.restClient.get().uri("/configuration")
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(String.class);
    }

    public String getSearch(String type, String query, Integer page) {
        int queryPage = (page != null && page >= 1) ? page : 1;
        return switch (type) {
            case "movies" -> this.restClient.get().uri("/search/movie" + "?query=" + query + "&page=" + queryPage)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(String.class);
            case "shows" -> this.restClient.get().uri("/search/tv" + "?query=" + query + "&page=" + queryPage)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(String.class);
            default -> "";
        };
    }
}
