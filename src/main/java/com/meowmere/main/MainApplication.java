package com.meowmere.main;

import com.meowmere.main.utils.UtilsShared;
import com.sun.org.apache.bcel.internal.generic.NEW;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
@EnableScheduling
@PropertySource("file:${app.home}/application.properties")
public class MainApplication extends SpringBootServletInitializer {

	public static void main(String[] args){
		System.setProperty("app.home", UtilsShared.GetMainDir());

		SpringApplication.run(MainApplication.class, args);
	}

}
