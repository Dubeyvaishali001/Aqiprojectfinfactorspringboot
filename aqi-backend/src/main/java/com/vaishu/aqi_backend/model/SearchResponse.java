
package com.vaishu.aqi_backend.model;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class SearchResponse {
    private String status;
    private List<SearchData> data;

    @Data
    @NoArgsConstructor
    public static class SearchData {
        private int uid;
        private City city;
    }

    @Data
    @NoArgsConstructor
    public static class City {
        private String name;
    }
}
