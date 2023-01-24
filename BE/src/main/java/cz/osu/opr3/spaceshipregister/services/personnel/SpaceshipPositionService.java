package cz.osu.opr3.spaceshipregister.services.personnel;

import cz.osu.opr3.spaceshipregister.models.entities.personnel.SpaceshipClearance;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.SpaceshipPosition;
import cz.osu.opr3.spaceshipregister.repositores.personnel.SpaceshipPositionRepository;
import cz.osu.opr3.spaceshipregister.services.BaseService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Service
public class SpaceshipPositionService extends BaseService<UUID, SpaceshipPosition, SpaceshipPositionRepository> {
	public SpaceshipPositionService(SpaceshipPositionRepository repository) {
		super(repository);
	}
	
	public Optional<SpaceshipPosition> update(SpaceshipPosition spaceshipClearance) {
		Optional<SpaceshipPosition> optionalSpaceshipPosition = super.update(spaceshipClearance);
		
		optionalSpaceshipPosition.ifPresent(position -> {
			SpaceshipClearance clearance = position.getClearance();
			
			position.setSpaceship(null);
			position.setCrewMembers(new ArrayList<>());
			
			clearance.setSpaceship(null);
			clearance.setPositions(new ArrayList<>());
			clearance.setMembers(new ArrayList<>());
		});
		
		return optionalSpaceshipPosition;
	}
}
