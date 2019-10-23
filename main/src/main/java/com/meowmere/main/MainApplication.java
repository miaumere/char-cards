package com.meowmere.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.meowmere.main")

public class MainApplication {

	public static void main(String[] args) {
		SpringApplication.run(MainApplication.class, args);

	}

}
