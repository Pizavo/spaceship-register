package cz.osu.opr3.spaceshipregister.services.components;

import cz.osu.opr3.spaceshipregister.models.entities.components.ComponentProducer;
import cz.osu.opr3.spaceshipregister.models.entities.components.Engine;
import cz.osu.opr3.spaceshipregister.repositores.components.EngineRepository;
import cz.osu.opr3.spaceshipregister.services.BaseService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class EngineService extends BaseService<UUID, Engine, EngineRepository> {
	public EngineService(EngineRepository repository) {
		super(repository);
	}
	
	public Iterable<Engine> list() {
		Iterable<Engine> engines = super.list();
		
		engines.forEach(engine -> {
			ComponentProducer producer = engine.getProducer();
			producer.setCores(new ArrayList<>());
			producer.setEngines(new ArrayList<>());
			producer.setLifeSupportUnits(new ArrayList<>());
			
			engine.setSpaceshipEngines(new ArrayList<>());
		});
		
		return engines;
	}
}
