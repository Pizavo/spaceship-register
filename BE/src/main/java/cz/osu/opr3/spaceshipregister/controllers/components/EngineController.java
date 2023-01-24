package cz.osu.opr3.spaceshipregister.controllers.components;

import cz.osu.opr3.spaceshipregister.controllers.BaseController;
import cz.osu.opr3.spaceshipregister.models.entities.components.Engine;
import cz.osu.opr3.spaceshipregister.services.components.EngineService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/engine")
public class EngineController extends BaseController<UUID, Engine, EngineService> {
	public EngineController(EngineService service) {
		super(service);
	}
}
