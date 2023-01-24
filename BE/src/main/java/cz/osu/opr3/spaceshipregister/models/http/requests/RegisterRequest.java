package cz.osu.opr3.spaceshipregister.models.http.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
	private String email;
	private String nickname;
	private String password;
	private String forename;
	private String surname;
	private UUID ownershipCode;
}
