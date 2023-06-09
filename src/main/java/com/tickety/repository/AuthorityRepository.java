package com.tickety.repository;

import com.tickety.domain.Authority;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
    Optional<Authority> findByName(String name);
}
