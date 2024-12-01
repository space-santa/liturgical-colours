package space.clau.colours;

import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class LiturgicalDay {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String colour;
    private int year;
    private int month;
    private int day;
    private String type;
    private String grade;
    private String liturgicalSeason;

    @JsonCreator
    public LiturgicalDay(@JsonProperty("name") String name, @JsonProperty("color") String colour,
            @JsonProperty("year") int year, @JsonProperty("month") int month,
            @JsonProperty("day") int day, @JsonProperty("type") String type,
            @JsonProperty("gradeLcl") String grade,
            @JsonProperty("liturgicalSeason") String liturgicalSeason) {
        this.name = name;
        this.colour = colour;
        this.year = year;
        this.month = month;
        this.day = day;
        this.type = type;
        this.grade = grade;
        this.liturgicalSeason = liturgicalSeason;
    }

    // No-argument constructor
    public LiturgicalDay() {}

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLiturgicalSeason() {
        return liturgicalSeason;
    }

    public void setLiturgicalSeason(String liturgicalSeason) {
        this.liturgicalSeason = liturgicalSeason;
    }
}
