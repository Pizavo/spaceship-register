package cz.osu.opr3.spaceshipregister.controllers.personnel;

import cz.osu.opr3.spaceshipregister.controllers.BaseController;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.SpaceshipPosition;
import cz.osu.opr3.spaceshipregister.services.personnel.SpaceshipPositionService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/spaceship-position")
public class SpaceshipPositionController extends BaseController<UUID, SpaceshipPosition, SpaceshipPositionService> {
	public SpaceshipPositionController(SpaceshipPositionService service) {
		super(service);
	}
}
