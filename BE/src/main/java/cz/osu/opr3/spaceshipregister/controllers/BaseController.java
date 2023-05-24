package cz.osu.opr3.spaceshipregister.controllers;

import cz.osu.opr3.spaceshipregister.models.entities.superclasses.BaseEntity;
import cz.osu.opr3.spaceshipregister.services.BaseService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;

@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class BaseController<ID extends Serializable, E extends BaseEntity<ID>, S extends BaseService<ID, E, ? extends JpaRepository<E, ID>>> {
	protected final S service;
	
	public BaseController(S service) {
		this.service = service;
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> get(@PathVariable ID id) {
		return this.makeResponse(
				() -> this.service.get(id).<ResponseEntity<Object>>map(ResponseEntity::ok)
				                  .orElseGet(() -> ResponseEntity.badRequest().build())
		);
	}
	
	@GetMapping("/list")
	public ResponseEntity<Object> list() {
		return this.makeResponse(() -> ResponseEntity.ok(this.service.list()));
	}
	
	@PostMapping
	public ResponseEntity<Object> create(@RequestBody E entity, Authentication authentication) {
		return this.makeResponse(() -> ResponseEntity.ok(this.service.create(entity)));
	}
	
	@PatchMapping
	public ResponseEntity<Object> update(@RequestBody E entity, Authentication authentication) {
		return this.makeResponse(() -> this.service.update(entity)
		                                           .<ResponseEntity<Object>>map(ResponseEntity::ok)
		                                           .orElseGet(() -> ResponseEntity.badRequest().build()));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable ID id) {
		return this.makeResponse(() -> {
			this.service.delete(id);
			return ResponseEntity.ok().build();
		});
	}
	
	/**
	 * Catches any Exception thrown by lambda function and returns Internal Server Error (500) ResponseEntity&lt;Object&gt; with exception message, if thrown.<br>
	 * Otherwise, returns ResponseEntity&lt;Object&gt; returned by given lambda function.
	 *
	 * @param lambda Lambda function returning ResponseEntity&lt;Object&gt; to be executed
	 * @return ResponseEntity&lt;Object&gt; - returned by lambda function, or Internal Server Error status containing exception message
	 */
	protected ResponseEntity<Object> makeResponse(ControllerMethodParameterFunctionalInterface lambda) {
		try {
			return lambda.method();
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body(e.getMessage());
		}
	}
}
