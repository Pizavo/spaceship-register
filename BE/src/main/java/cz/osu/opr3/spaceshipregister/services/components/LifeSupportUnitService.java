package cz.osu.opr3.spaceshipregister.services.components;

import cz.osu.opr3.spaceshipregister.models.entities.components.ComponentProducer;
import cz.osu.opr3.spaceshipregister.models.entities.components.LifeSupportUnit;
import cz.osu.opr3.spaceshipregister.repositores.components.LifeSupportUnitRepository;
import cz.osu.opr3.spaceshipregister.services.BaseService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class LifeSupportUnitService extends BaseService<UUID, LifeSupportUnit, LifeSupportUnitRepository> {
	public LifeSupportUnitService(LifeSupportUnitRepository repository) {
		super(repository);
	}
	
	public Iterable<LifeSupportUnit> list() {
		Iterable<LifeSupportUnit> lifeSupportUnits = super.list();
		
		lifeSupportUnits.forEach(lifeSupportUnit -> {
			ComponentProducer producer = lifeSupportUnit.getProducer();
			producer.setCores(new ArrayList<>());
			producer.setEngines(new ArrayList<>());
			producer.setLifeSupportUnits(new ArrayList<>());
			
			lifeSupportUnit.setSpaceshipLifeSupportUnits(new ArrayList<>());
		});
		
		return lifeSupportUnits;
	}
}
