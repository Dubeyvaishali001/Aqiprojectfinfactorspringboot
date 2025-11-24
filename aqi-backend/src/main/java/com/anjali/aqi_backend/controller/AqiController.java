package com.anjali.aqi_backend.controller;


import com.anjali.aqi_backend.model.AqiResponse;
import com.anjali.aqi_backend.service.AqiService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/aqi")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AqiController {

    private final AqiService service;

    @GetMapping("/{city}")
    public ResponseEntity<AqiResponse> getAqi(@PathVariable String city) {
        Optional<AqiResponse> result = service.getAqiByCity(city);

        return result
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
