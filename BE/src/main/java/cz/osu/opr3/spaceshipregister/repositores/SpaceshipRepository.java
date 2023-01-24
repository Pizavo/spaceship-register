package cz.osu.opr3.spaceshipregister.repositores;

import cz.osu.opr3.spaceshipregister.models.entities.Spaceship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SpaceshipRepository extends JpaRepository<Spaceship, UUID> {
	Iterable<Spaceship> findAllByOwnerId(UUID id);
}