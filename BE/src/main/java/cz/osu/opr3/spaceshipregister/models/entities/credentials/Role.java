package cz.osu.opr3.spaceshipregister.models.entities.credentials;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
	OWNER,
	ADMIN;
	
	@Override
	public String getAuthority() {
		return this.name();
	}
}
