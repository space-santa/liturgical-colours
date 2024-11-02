package space.clau.colours;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

@SpringBootApplication
@ComponentScan(excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, value = DataLoaderApplication.class))
public class ColoursApplication {

	public static void main(String[] args) {
		SpringApplication.run(ColoursApplication.class, args);
	}
}
