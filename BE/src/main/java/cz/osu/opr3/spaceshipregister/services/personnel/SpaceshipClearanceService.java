package cz.osu.opr3.spaceshipregister.services.personnel;

import cz.osu.opr3.spaceshipregister.models.entities.personnel.SpaceshipClearance;
import cz.osu.opr3.spaceshipregister.repositores.personnel.SpaceshipClearanceRepository;
import cz.osu.opr3.spaceshipregister.services.BaseService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Service
public class SpaceshipClearanceService extends BaseService<UUID, SpaceshipClearance, SpaceshipClearanceRepository> {
	public SpaceshipClearanceService(SpaceshipClearanceRepository repository) {
		super(repository);
	}
	
	public Optional<SpaceshipClearance> update(SpaceshipClearance spaceshipClearance) {
		Optional<SpaceshipClearance> optionalSpaceshipClearance = super.update(spaceshipClearance);
		
		optionalSpaceshipClearance.ifPresent(clearance -> {
			clearance.setSpaceship(null);
			clearance.setMembers(new ArrayList<>());
			clearance.setPositions(new ArrayList<>());
		});
		
		return optionalSpaceshipClearance;
	}
}
