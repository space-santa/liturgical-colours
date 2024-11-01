package space.clau.colours;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.zip.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootApplication
public class DataLoaderApplication {

    public static void main(String[] args) {
        SpringApplication.run(DataLoaderApplication.class, args);
    }

    @Bean
    CommandLineRunner loadData(EntityManagerFactory emf) {
        return args -> {
            EntityManager em = emf.createEntityManager();
            EntityTransaction transaction = em.getTransaction();
            transaction.begin();

            Path zipFilePath = Paths.get("data.zip");
            Path extractDir = Paths.get("data_tmp");

            try {
                // Extract the zip file
                unzip(zipFilePath, extractDir);

                // Process extracted JSON files
                Files.walk(extractDir)
                        .filter(Files::isRegularFile)
                        .forEach(file -> {
                            try {
                                processJsonFile(em, file);
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        });

                transaction.commit();
            } catch (Exception e) {
                transaction.rollback();
                e.printStackTrace();
            } finally {
                em.close();
            }

            // Clean up extracted files
            deleteDirectory(extractDir.toFile());
        };
    }

    private void unzip(Path zipFilePath, Path extractDir) throws IOException {
        try (ZipInputStream zis = new ZipInputStream(Files.newInputStream(zipFilePath))) {
            ZipEntry entry;
            while ((entry = zis.getNextEntry()) != null) {
                Path newFilePath = extractDir.resolve(entry.getName());
                if (entry.isDirectory()) {
                    Files.createDirectories(newFilePath);
                } else {
                    Files.createDirectories(newFilePath.getParent());
                    Files.copy(zis, newFilePath, StandardCopyOption.REPLACE_EXISTING);
                }
                zis.closeEntry();
            }
        }
    }

    private void processJsonFile(EntityManager em, Path file) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String content = new String(Files.readAllBytes(file));
        System.out.println("Processing file: " + file);

        Map<String, Map<String, LiturgicalDay>> yearData = objectMapper.readValue(content,
                new TypeReference<Map<String, Map<String, LiturgicalDay>>>() {
                });

        yearData.forEach((month, dayMap) -> {
            dayMap.forEach((day, liturgicalDay) -> {
                em.persist(liturgicalDay);
            });
        });
    }

    private void deleteDirectory(File directory) {
        File[] allContents = directory.listFiles();
        if (allContents != null) {
            for (File file : allContents) {
                deleteDirectory(file);
            }
        }
        directory.delete();
    }
}
