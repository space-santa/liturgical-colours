package space.clau.colours;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import jakarta.persistence.EntityManagerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Bean;

import space.clau.colours.DataLoader;

@SpringBootApplication
public class ColoursApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(ColoursApplication.class);
		if (Arrays.asList(args).contains("load-data")) {
			app.setAdditionalProfiles("dataloader");
		}
		app.run(args);
	}

	@Bean
	CommandLineRunner loadData(EntityManagerFactory emf, ApplicationContext context) {
		return args -> {
			if (!Arrays.asList(args).contains("load-data")) {
				return;
			}

			DataLoader dl = new DataLoader();
			dl.loadData(emf);

			SpringApplication.exit(context, () -> 0);
		};
	}
}
