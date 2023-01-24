package cz.osu.opr3.spaceshipregister.services;

import cz.osu.opr3.spaceshipregister.configurations.JwtService;
import cz.osu.opr3.spaceshipregister.models.entities.credentials.Role;
import cz.osu.opr3.spaceshipregister.models.entities.credentials.User;
import cz.osu.opr3.spaceshipregister.models.http.requests.AuthenticationRequest;
import cz.osu.opr3.spaceshipregister.models.http.responses.AuthenticationResponse;
import cz.osu.opr3.spaceshipregister.repositores.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService extends BaseService<UUID, User, UserRepository> {
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	
	public UserService(
			UserRepository repository,
			PasswordEncoder passwordEncoder,
			JwtService jwtService,
			AuthenticationManager authenticationManager
	) {
		super(repository);
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	}
	
	public Optional<AuthenticationResponse> authenticate(AuthenticationRequest authenticationRequest, HttpServletRequest request) {
		this.authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						authenticationRequest.getEmail(),
						authenticationRequest.getPassword()
				)
		);
		
		Optional<User> user = this.repository.findByEmail(authenticationRequest.getEmail());
		
		return user.map(value -> new AuthenticationResponse(
				this.jwtService.generateToken(value, request)
		));
	}
	
	@Override
	public User create(User entity) {
		return new User();
	}
	
	public Optional<User> update(User entity) {
		Optional<User> optionalUser = this.repository.findById(entity.getId());
		
		if (optionalUser.isEmpty()) {
			return Optional.empty();
		}
		
		User user = optionalUser.get();
		
		entity.setOwnershipCode(user.getOwnershipCode());
		
		if (entity.getPassword() == null || entity.getPassword().length() == 0) {
			entity.setPassword(user.getPassword());
		} else {
			entity.setPassword(this.passwordEncoder.encode(entity.getPassword()));
		}
		
		return super.update(entity);
	}
	
	public Optional<User> getByEmail(String email) {
		return this.repository.findByEmail(email);
	}
	
	public User register(User entity) {
		List<Role> roles = new ArrayList<>();
		roles.add(Role.OWNER);
		
		User user = User.builder()
		                .forename(entity.getForename())
		                .surname(entity.getSurname())
		                .email(entity.getEmail())
		                .nickname(entity.getNickname())
		                .password(this.passwordEncoder.encode(entity.getPassword()))
		                .ownershipCode(entity.getOwnershipCode())
		                .roles(roles)
		                .build();
		
		return super.create(user);
	}
}
