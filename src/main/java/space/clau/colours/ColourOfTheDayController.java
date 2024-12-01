package space.clau.colours;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
public class ColourOfTheDayController {

    @Autowired
    private LiturgicalDayRepository liturgicalDayRepository;

    @GetMapping("/api/colour-of-the-day/")
    public Map<String, String> getColourOfTheDay(@RequestParam(value = "date", required = false)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        if (date == null) {
            date = LocalDate.now();
        }

        Optional<LiturgicalDay> liturgicalDay = liturgicalDayRepository.findByYearAndMonthAndDay(
                date.getYear(), date.getMonthValue(), date.getDayOfMonth());

        String colour = liturgicalDay.map(LiturgicalDay::getColour)
                .orElse("Colour not found for the given date");
        Map<String, String> response = new HashMap<>();
        response.put("colour", colour);

        return response;
    }
}
