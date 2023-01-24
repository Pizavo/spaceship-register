package cz.osu.opr3.spaceshipregister.services.components;

import cz.osu.opr3.spaceshipregister.models.entities.components.ComponentProducer;
import cz.osu.opr3.spaceshipregister.models.entities.components.Core;
import cz.osu.opr3.spaceshipregister.repositores.components.CoreRepository;
import cz.osu.opr3.spaceshipregister.services.BaseService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class CoreService extends BaseService<UUID, Core, CoreRepository> {
    public CoreService(CoreRepository repository) {
        super(repository);
    }
    
    public Iterable<Core> list() {
        Iterable<Core> cores = super.list();
        
        cores.forEach(core -> {
            ComponentProducer producer = core.getProducer();
            producer.setCores(new ArrayList<>());
            producer.setEngines(new ArrayList<>());
            producer.setLifeSupportUnits(new ArrayList<>());
            
            core.setSpaceshipCores(new ArrayList<>());
        });
        
        return cores;
    }
}
