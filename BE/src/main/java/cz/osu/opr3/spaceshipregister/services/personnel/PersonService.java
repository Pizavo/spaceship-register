package cz.osu.opr3.spaceshipregister.services.personnel;

import cz.osu.opr3.spaceshipregister.models.entities.personnel.CrewMember;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.Person;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.SpaceshipClearance;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.SpaceshipPosition;
import cz.osu.opr3.spaceshipregister.repositores.personnel.PersonRepository;
import cz.osu.opr3.spaceshipregister.services.BaseService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class PersonService extends BaseService<UUID, Person, PersonRepository> {
	public PersonService(PersonRepository repository) {
		super(repository);
	}
	
	public Iterable<Person> list() {
		Iterable<Person> persons = super.list();
		
		persons.forEach(person -> {
			CrewMember member = person.getMember();
			
			if (member != null) {
				SpaceshipPosition position = member.getPosition();
				SpaceshipClearance positionClearance = position.getClearance();
				SpaceshipClearance specialClearance = member.getSpecialClearance();
				
				member.setPerson(null);
				position.setSpaceship(null);
				position.setCrewMembers(new ArrayList<>());
				positionClearance.setPositions(new ArrayList<>());
				positionClearance.setMembers(new ArrayList<>());
				
				if (specialClearance != null) {
					specialClearance.setPositions(new ArrayList<>());
					specialClearance.setMembers(new ArrayList<>());
				}
			}
		});
		
		return persons;
	}
	
	public Iterable<Person> listFree() {
		return this.repository.findAllByMemberIsNull();
	}
}
