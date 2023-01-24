package cz.osu.opr3.spaceshipregister.controllers;

import cz.osu.opr3.spaceshipregister.models.entities.Spaceship;
import cz.osu.opr3.spaceshipregister.models.entities.credentials.User;
import cz.osu.opr3.spaceshipregister.services.SpaceshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/spaceship")
public class SpaceshipController extends BaseController<UUID, Spaceship, SpaceshipService> {
	public SpaceshipController(SpaceshipService service) {
		super(service);
	}
	
	@GetMapping("/list/user")
	public ResponseEntity<Object> listByUser(Authentication authentication) {
		return this.makeResponse(() -> ResponseEntity.ok(this.service.listByUser(((User) authentication.getPrincipal()).getId())));
	}
	
	public ResponseEntity<Object> create(@RequestBody Spaceship spaceship, Authentication authentication) {
		spaceship.setOwner(((User) authentication.getPrincipal()));
		
		Spaceship tmpSpaceship = this.service.create(spaceship);
		tmpSpaceship.setOwner(null);
		
		return this.makeResponse(() -> ResponseEntity.ok(tmpSpaceship));
	}
	
	public ResponseEntity<Object> update(@RequestBody Spaceship spaceship, Authentication authentication) {
		spaceship.setOwner((User) authentication.getPrincipal());
		
		return super.update(spaceship, authentication);
	}
}
