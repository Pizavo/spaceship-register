package cz.osu.opr3.spaceshipregister.controllers.personnel;

import cz.osu.opr3.spaceshipregister.controllers.BaseController;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.Person;
import cz.osu.opr3.spaceshipregister.services.personnel.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/person")
public class PersonController extends BaseController<UUID, Person, PersonService> {
	public PersonController(PersonService service) {
		super(service);
	}
	
	@GetMapping("/list/free")
	public ResponseEntity<Object> listFree() {
		return this.makeResponse(() -> ResponseEntity.ok(this.service.listFree()));
	}
}
