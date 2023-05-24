package cz.osu.opr3.spaceshipregister.models.entities.credentials;

import cz.osu.opr3.spaceshipregister.models.entities.Spaceship;
import cz.osu.opr3.spaceshipregister.models.entities.superclasses.BaseEntity;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User extends BaseEntity<UUID> implements UserDetails {
	@Column(nullable = false, unique = true)
	private String email;
	
	@Column(nullable = false, unique = true)
	private String nickname;
	
	@Column(nullable = false, length = 512)
	private String password;
	
	@Column(nullable = false)
	private String forename;
	
	@Column(nullable = false)
	private String surname;
	
	@Column(nullable = false, unique = true)
	private UUID ownershipCode;
	
	@OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("name")
	private List<Spaceship> spaceships = new ArrayList<>();
	
	@ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
	@CollectionTable
	@Enumerated(EnumType.STRING)
	private List<Role> roles;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles;
	}
	
	@Override
	public String getPassword() {
		return this.password;
	}
	
	@Override
	public String getUsername() {
		return email;
	}
	
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	
	@Override
	public boolean isEnabled() {
		return true;
	}
}
