package cz.osu.opr3.spaceshipregister.services;

import cz.osu.opr3.spaceshipregister.models.entities.Spaceship;
import cz.osu.opr3.spaceshipregister.models.entities.components.*;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.Person;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.SpaceshipClearance;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.SpaceshipPosition;
import cz.osu.opr3.spaceshipregister.repositores.SpaceshipRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Service
public class SpaceshipService extends BaseService<UUID, Spaceship, SpaceshipRepository> {
	public SpaceshipService(SpaceshipRepository repository) {
		super(repository);
	}
	
	public Iterable<Spaceship> listByUser(UUID id) {
		Iterable<Spaceship> spaceships = this.repository.findAllByOwnerId(id);
		
		spaceships.forEach(spaceship -> {
			this.prepareForJSON(spaceship);
			
			spaceship.setOwner(null);
			spaceship.setCrew(new ArrayList<>());
			spaceship.setClearances(new ArrayList<>());
			spaceship.setPositions(new ArrayList<>());
		});
		
		return spaceships;
	}
	
	public Optional<Spaceship> get(UUID id) {
		Optional<Spaceship> optionalSpaceship = super.get(id);
		
		return this.prepareForGetOrUpdateReturn(optionalSpaceship);
	}
	
	public Optional<Spaceship> update(Spaceship spaceship) {
		Optional<Spaceship> optionalSpaceship = this.repository.findById(spaceship.getId());
		
		if (optionalSpaceship.isEmpty()) {
			return optionalSpaceship;
		}
		
		Spaceship tmpSpaceship = optionalSpaceship.get();
		tmpSpaceship.setName(spaceship.getName());
		tmpSpaceship.setCommission(spaceship.getCommission());
		tmpSpaceship.setCore(spaceship.getCore());
		tmpSpaceship.setEngine(spaceship.getEngine());
		tmpSpaceship.setLifeSupportUnit(spaceship.getLifeSupportUnit());
		
		return this.prepareForGetOrUpdateReturn(super.update(tmpSpaceship));
	}
	
	private Optional<Spaceship> prepareForGetOrUpdateReturn(Optional<Spaceship> optionalSpaceship) {
		if (optionalSpaceship.isEmpty()) {
			return optionalSpaceship;
		}
		
		Spaceship spaceship = optionalSpaceship.get();
		this.prepareForJSON(spaceship);
		
		spaceship.setOwner(null);
		
		spaceship.getCrew().forEach(member -> {
			member.setSpaceship(null);
			
			Person person = member.getPerson();
			SpaceshipPosition spaceshipPosition = member.getPosition();
			SpaceshipClearance specialClearance = member.getSpecialClearance();
			SpaceshipClearance clearance = spaceshipPosition.getClearance();
			
			person.setMember(null);
			
			spaceshipPosition.setSpaceship(null);
			spaceshipPosition.setCrewMembers(new ArrayList<>());
			
			if (specialClearance != null) {
				specialClearance.setSpaceship(null);
				specialClearance.setPositions(new ArrayList<>());
				specialClearance.setMembers(new ArrayList<>());
			}
			
			clearance.setSpaceship(null);
			clearance.setPositions(new ArrayList<>());
			clearance.setMembers(new ArrayList<>());
		});
		
		spaceship.getClearances().forEach(clearance -> {
			clearance.setSpaceship(null);
			clearance.setPositions(new ArrayList<>());
			clearance.setMembers(new ArrayList<>());
		});
		
		spaceship.getPositions().forEach(position -> {
			SpaceshipClearance clearance = position.getClearance();
			
			position.setSpaceship(null);
			position.setCrewMembers(new ArrayList<>());
			
			clearance.setSpaceship(null);
			clearance.setPositions(new ArrayList<>());
			clearance.setMembers(new ArrayList<>());
		});
		
		return Optional.of(spaceship);
	}
	
	private void prepareForJSON(Spaceship spaceship) {
		SpaceshipCore spaceshipCore = spaceship.getCore();
		SpaceshipEngine spaceshipEngine = spaceship.getEngine();
		SpaceshipLifeSupportUnit spaceshipLifeSupportUnit = spaceship.getLifeSupportUnit();
		
		if (spaceshipCore != null) {
			spaceshipCore.setSpaceship(null);
			
			Core core = spaceshipCore.getType();
			ComponentProducer coreProducer = core.getProducer();
			
			core.setSpaceshipCores(new ArrayList<>());
			coreProducer.setCores(new ArrayList<>());
			coreProducer.setEngines(new ArrayList<>());
			coreProducer.setLifeSupportUnits(new ArrayList<>());
		}
		
		if (spaceshipEngine != null) {
			spaceshipEngine.setSpaceship(null);
			
			Engine engine = spaceshipEngine.getType();
			ComponentProducer engineProducer = engine.getProducer();
			
			engine.setSpaceshipEngines(new ArrayList<>());
			engineProducer.setCores(new ArrayList<>());
			engineProducer.setEngines(new ArrayList<>());
			engineProducer.setLifeSupportUnits(new ArrayList<>());
		}
		
		if (spaceshipLifeSupportUnit != null) {
			spaceshipLifeSupportUnit.setSpaceship(null);
			
			LifeSupportUnit lifeSupportUnit = spaceshipLifeSupportUnit.getType();
			ComponentProducer lifeSupportUnitProducer = lifeSupportUnit.getProducer();
			
			lifeSupportUnit.setSpaceshipLifeSupportUnits(new ArrayList<>());
			lifeSupportUnitProducer.setCores(new ArrayList<>());
			lifeSupportUnitProducer.setEngines(new ArrayList<>());
			lifeSupportUnitProducer.setLifeSupportUnits(new ArrayList<>());
		}
		
	}
}
