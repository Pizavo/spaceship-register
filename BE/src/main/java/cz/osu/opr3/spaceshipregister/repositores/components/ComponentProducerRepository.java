package cz.osu.opr3.spaceshipregister.repositores.components;

import cz.osu.opr3.spaceshipregister.models.entities.components.ComponentProducer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ComponentProducerRepository extends JpaRepository<ComponentProducer, UUID> {
	Optional<ComponentProducer> findByName(String name);
}