package cz.osu.opr3.spaceshipregister.controllers.components;

import cz.osu.opr3.spaceshipregister.controllers.BaseController;
import cz.osu.opr3.spaceshipregister.models.entities.components.ComponentProducer;
import cz.osu.opr3.spaceshipregister.services.components.ComponentProducerService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/component-producers")
public class ComponentProducerController extends BaseController<UUID, ComponentProducer, ComponentProducerService> {
	public ComponentProducerController(ComponentProducerService service) {
		super(service);
	}
}
