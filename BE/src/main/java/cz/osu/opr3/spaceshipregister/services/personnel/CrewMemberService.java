package cz.osu.opr3.spaceshipregister.services.personnel;

import cz.osu.opr3.spaceshipregister.models.entities.personnel.CrewMember;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.SpaceshipClearance;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.SpaceshipPosition;
import cz.osu.opr3.spaceshipregister.repositores.personnel.CrewMemberRepository;
import cz.osu.opr3.spaceshipregister.services.BaseService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Service
public class CrewMemberService extends BaseService<UUID, CrewMember, CrewMemberRepository> {
	public CrewMemberService(CrewMemberRepository repository) {
		super(repository);
	}
	
	public Optional<CrewMember> update(CrewMember entity) {
		Optional<CrewMember> optionalCrewMember = super.update(entity);
		
		if (optionalCrewMember.isPresent()) {
			CrewMember crewMember = optionalCrewMember.get();
			SpaceshipPosition position = crewMember.getPosition();
			SpaceshipClearance clearance = position.getClearance();
			SpaceshipClearance specialClearance = crewMember.getSpecialClearance();
			
			crewMember.setSpaceship(null);
			crewMember.getPerson().setMember(null);
			
			position.setSpaceship(null);
			position.setClearance(null);
			position.setCrewMembers(new ArrayList<>());
			
			clearance.setSpaceship(null);
			clearance.setPositions(new ArrayList<>());
			clearance.setMembers(new ArrayList<>());
			
			specialClearance.setSpaceship(null);
			specialClearance.setPositions(new ArrayList<>());
			specialClearance.setMembers(new ArrayList<>());
			
			optionalCrewMember = Optional.of(crewMember);
		}
		
		return optionalCrewMember;
	}
}
