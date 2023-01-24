package cz.osu.opr3.spaceshipregister.controllers;

import cz.osu.opr3.spaceshipregister.models.entities.credentials.User;
import cz.osu.opr3.spaceshipregister.models.http.requests.AuthenticationRequest;
import cz.osu.opr3.spaceshipregister.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController extends BaseController<UUID, User, UserService> {
	public UserController(UserService service) {
		super(service);
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<Object> authenticate(@RequestBody AuthenticationRequest authenticationRequest, HttpServletRequest request) {
		return this.makeResponse(() -> this.service.authenticate(authenticationRequest, request)
		                                           .<ResponseEntity<Object>>map(ResponseEntity::ok)
		                                           .orElseGet(() -> ResponseEntity.badRequest().build()));
	}
	
	@PostMapping("/register")
	public ResponseEntity<Object> register(@RequestBody User entity) {
		return this.makeResponse(() -> ResponseEntity.ok(this.service.register(entity)));
	}
	
	@PostMapping("/logout")
	public ResponseEntity<Object> logout() {
		return this.makeResponse(() -> ResponseEntity.ok().build());
	}
}
