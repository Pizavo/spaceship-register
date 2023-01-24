package cz.osu.opr3.spaceshipregister.repositores.personnel;

import cz.osu.opr3.spaceshipregister.models.entities.personnel.SpaceshipPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SpaceshipPositionRepository extends JpaRepository<SpaceshipPosition, UUID> {
}