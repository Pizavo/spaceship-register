package cz.osu.opr3.spaceshipregister.repositores.personnel;

import cz.osu.opr3.spaceshipregister.models.entities.personnel.SpaceshipClearance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SpaceshipClearanceRepository extends JpaRepository<SpaceshipClearance, UUID> {
}