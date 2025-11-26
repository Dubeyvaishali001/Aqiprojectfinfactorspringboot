package com.vaishu.aqi_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AqiResponse {

    private String status;
    private AqiData data;

    @Data
    @NoArgsConstructor
    public static class AqiData {
        private City city;
        private Integer aqi;
        private Iaqi iaqi;
        private String dominentpol;

        @Data
        @NoArgsConstructor
        public static class City {
            private String name;
        }

        @Data
        @NoArgsConstructor
        public static class Iaqi {
            private Pollutant pm25;
            private Pollutant pm10;
            private Pollutant o3;
            private Pollutant no2;
            private Pollutant so2;
            private Pollutant co;

            @Data
            @NoArgsConstructor
            public static class Pollutant {
                private Float v;
            }
        }
    }
}
