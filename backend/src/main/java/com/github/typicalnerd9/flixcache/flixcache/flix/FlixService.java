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
                .defaultHeader("Authorization", "Bearer " + System.getenv("TMDB"))
                .build();
    }

    public String getTrending(String type, String timeframe) {
        final String safeTimeframe = (!timeframe.equals("day") && !timeframe.equals("week")) ? timeframe : "day";
        return switch (type) {
            case "movie" -> this.restClient.get().uri("/trending/movie/"+ safeTimeframe)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(String.class);
            case "tv" -> this.restClient.get().uri("/trending/tv/"+ safeTimeframe)
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
            case "movie" -> this.restClient.get().uri("/search/movie" + "?query=" + query + "&page=" + queryPage)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(String.class);
            case "tv" -> this.restClient.get().uri("/search/tv" + "?query=" + query + "&page=" + queryPage)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(String.class);
            default -> "";
        };
    }

    public String getDetails(String type, String id, boolean withImages, boolean withVideos, boolean withWatchProviders) {
        String imageQuery = "images&include_image_language=en,null";
        String videoQuery = "videos";
        String watchProvidersQuery = "watch/providers";
        String queryAppends = "?append_to_response=";
        if (withImages && withVideos && withWatchProviders) queryAppends += videoQuery + "," + watchProvidersQuery + "," + imageQuery;
        else if (withImages && withVideos) queryAppends += videoQuery + "," + imageQuery;
        else if (withImages && withWatchProviders) queryAppends += watchProvidersQuery + "," + imageQuery;
        else if (withVideos && withWatchProviders) queryAppends += videoQuery + "," + watchProvidersQuery;
        else if (withImages) queryAppends += imageQuery;
        else if (withVideos) queryAppends += videoQuery;
        else if (withWatchProviders) queryAppends += watchProvidersQuery;
        queryAppends += "&language=en-US";
        System.out.println(withWatchProviders);
        System.out.println(queryAppends);
        return switch (type) {
            case "movie" -> this.restClient.get().uri("/movie/" + id + (withImages || withVideos || withWatchProviders ? queryAppends : ""))
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(String.class);
            case "tv" -> this.restClient.get().uri("/tv/" + id + (withImages || withVideos || withWatchProviders ? queryAppends : ""))
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(String.class);
            default -> "";
        };
    }

    public String getVideos(String type, String id) {
        return switch (type) {
            case "movie" -> this.restClient.get().uri("/movie/" + id + "/videos")
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(String.class);
            case "tv" -> this.restClient.get().uri("/tv/" + id + "/videos")
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(String.class);
            default -> "";
        };
    }
}
