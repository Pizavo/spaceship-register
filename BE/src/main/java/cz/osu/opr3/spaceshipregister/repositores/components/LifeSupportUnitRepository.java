package cz.osu.opr3.spaceshipregister.repositores.components;

import cz.osu.opr3.spaceshipregister.models.entities.components.LifeSupportUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LifeSupportUnitRepository extends JpaRepository<LifeSupportUnit, UUID> {
}