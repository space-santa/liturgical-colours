package space.clau.colours;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface LiturgicalDayRepository extends JpaRepository<LiturgicalDay, Long> {
    Optional<LiturgicalDay> findByYearAndMonthAndDay(int year, int month, int day);
}
