package cz.osu.opr3.spaceshipregister.controllers.personnel;

import cz.osu.opr3.spaceshipregister.controllers.BaseController;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.SpaceshipClearance;
import cz.osu.opr3.spaceshipregister.services.personnel.SpaceshipClearanceService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/spaceship-clearance")
public class SpaceshipClearanceController extends BaseController<UUID, SpaceshipClearance, SpaceshipClearanceService> {
	public SpaceshipClearanceController(SpaceshipClearanceService service) {
		super(service);
	}
}
