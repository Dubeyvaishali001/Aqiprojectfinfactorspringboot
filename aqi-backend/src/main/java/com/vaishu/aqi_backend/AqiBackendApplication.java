package com.vaishu.aqi_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class AqiBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(AqiBackendApplication.class, args);
    }
}

