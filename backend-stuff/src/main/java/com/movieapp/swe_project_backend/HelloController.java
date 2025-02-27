package com.movieapp.swe_project_backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController  {
    @GetMapping(path = "/hello")
    public String helloWorld() {
        return "Hello World";
    }
}
