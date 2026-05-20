package de.rechnungsanwendung.backend.persistenz;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RechnungsRepository extends JpaRepository<RechnungEntity, Long>{

    boolean existsByRechnungsNummerIgnoreCase(String rechnungsNummer);
    
}
