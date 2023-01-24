package cz.osu.opr3.spaceshipregister.controllers.personnel;

import cz.osu.opr3.spaceshipregister.controllers.BaseController;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.CrewMember;
import cz.osu.opr3.spaceshipregister.services.personnel.CrewMemberService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/crew-member")
public class CrewMemberController extends BaseController<UUID, CrewMember, CrewMemberService> {
	public CrewMemberController(CrewMemberService service) {
		super(service);
	}
}
