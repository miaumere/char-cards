package com.meowmere.main;

import com.meowmere.main.utils.UtilsShared;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
@EnableScheduling
@PropertySources({
@PropertySource(value = "file:${app.home}/application.properties",ignoreResourceNotFound = true)
})
public class MainApplication extends SpringBootServletInitializer {

	public static void main(String[] args){
		System.setProperty("app.home", UtilsShared.GetMainDir());

		SpringApplication.run(MainApplication.class, args);
	}

}
