package cz.osu.opr3.spaceshipregister.models.http.requests;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class AuthenticationRequest {
	private String email;
	private String password;
}
