package cz.osu.opr3.spaceshipregister.services.components;

import cz.osu.opr3.spaceshipregister.models.entities.components.ComponentProducer;
import cz.osu.opr3.spaceshipregister.repositores.components.ComponentProducerRepository;
import cz.osu.opr3.spaceshipregister.services.BaseService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ComponentProducerService extends BaseService<UUID, ComponentProducer, ComponentProducerRepository> {
    public ComponentProducerService(ComponentProducerRepository repository) {
        super(repository);
    }
    
    public ComponentProducer getByName(String name) {
        return this.repository.findByName(name).orElse(null);
    }
}
