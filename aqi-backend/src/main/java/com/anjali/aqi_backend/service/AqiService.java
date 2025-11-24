package com.anjali.aqi_backend.service;

import com.anjali.aqi_backend.model.AqiResponse;
import com.anjali.aqi_backend.model.SearchResponse;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

@Service
@Slf4j
public class AqiService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final Dotenv dotenv = Dotenv.load();

    private final String baseUrl = dotenv.get("AQI_BASE_URL");
    private final String token = dotenv.get("AQI_TOKEN");

    @Cacheable(value = "aqiCache", key = "#city.toLowerCase()")
    public Optional<AqiResponse> getAqiByCity(String city) {

        if (city == null || city.trim().isEmpty()) {
            return Optional.empty();
        }

        // STEP 1 — Search API (Correct station for India)
        String searchUrl = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/search/")
                .queryParam("token", token)
                .queryParam("keyword", city)
                .toUriString();

        try {
            log.info("Searching station for: {}", city);

            SearchResponse searchResponse =
                    restTemplate.getForObject(searchUrl, SearchResponse.class);

            if (searchResponse == null || !"ok".equals(searchResponse.getStatus()) ||
                    searchResponse.getData().isEmpty()) {
                log.warn("No active monitoring station found for: {}", city);
                return Optional.empty();
            }

            int uid = searchResponse.getData().get(0).getUid();
            log.info("Station UID for {} => {}", city, uid);

            // STEP 2 — Fetch AQI using UID
            String feedUrl = UriComponentsBuilder
                    .fromHttpUrl(baseUrl + "/feed/@" + uid + "/")
                    .queryParam("token", token)
                    .toUriString();

            log.info("Fetching AQI from: {}", feedUrl);

            AqiResponse response =
                    restTemplate.getForObject(feedUrl, AqiResponse.class);

            if (response != null && "ok".equals(response.getStatus())) {
                return Optional.of(response);
            }

        } catch (Exception e) {
            log.error("API error: {}", e.getMessage());
        }

        return Optional.empty();
    }
}
