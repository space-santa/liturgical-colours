package space.clau.colours;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DataVerificationController {

    @Autowired
    private LiturgicalDayRepository liturgicalDayRepository;

    @GetMapping("/api/all-liturgical-days/")
    public List<LiturgicalDay> getAllLiturgicalDays() {
        return liturgicalDayRepository.findAll();
    }
}
