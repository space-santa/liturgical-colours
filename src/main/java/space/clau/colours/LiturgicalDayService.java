package space.clau.colours;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class LiturgicalDayService {
    private final LiturgicalDayRepository repository;

    @Autowired
    public LiturgicalDayService(LiturgicalDayRepository repository) {
        this.repository = repository;
    }

    public Optional<LiturgicalDay> findLiturgicalDay(int year, int month, int day) {
        return repository.findByYearAndMonthAndDay(year, month, day);
    }
}
