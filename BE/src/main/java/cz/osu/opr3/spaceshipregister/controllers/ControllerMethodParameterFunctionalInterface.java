package cz.osu.opr3.spaceshipregister.controllers;

import org.springframework.http.ResponseEntity;

@FunctionalInterface
public interface ControllerMethodParameterFunctionalInterface {
	ResponseEntity<Object> method() throws Exception;
}
