package com.tickety.repository;

import com.tickety.domain.Event;
import com.tickety.domain.Ticket;
import com.tickety.domain.UserAccount;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Event entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {}
