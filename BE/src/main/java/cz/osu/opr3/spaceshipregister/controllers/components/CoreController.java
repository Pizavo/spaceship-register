package cz.osu.opr3.spaceshipregister.controllers.components;

import cz.osu.opr3.spaceshipregister.controllers.BaseController;
import cz.osu.opr3.spaceshipregister.models.entities.components.Core;
import cz.osu.opr3.spaceshipregister.services.components.CoreService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/core")
public class CoreController extends BaseController<UUID, Core, CoreService> {
	public CoreController(CoreService service) {
		super(service);
	}
}
