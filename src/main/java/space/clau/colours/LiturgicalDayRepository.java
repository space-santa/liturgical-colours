package space.clau.colours;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface LiturgicalDayRepository extends JpaRepository<LiturgicalDay, UUID> {
    Optional<LiturgicalDay> findByYearAndMonthAndDay(int year, int month, int day);

}
