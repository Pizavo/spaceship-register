package cz.osu.opr3.spaceshipregister.controllers.components;

import cz.osu.opr3.spaceshipregister.controllers.BaseController;
import cz.osu.opr3.spaceshipregister.models.entities.components.LifeSupportUnit;
import cz.osu.opr3.spaceshipregister.services.components.LifeSupportUnitService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/life-support-unit")
public class LifeSupportUnitController extends BaseController<UUID, LifeSupportUnit, LifeSupportUnitService> {
	public LifeSupportUnitController(LifeSupportUnitService service) {
		super(service);
	}
}
