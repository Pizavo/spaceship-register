package cz.osu.opr3.spaceshipregister.repositores;

import cz.osu.opr3.spaceshipregister.models.entities.credentials.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
	Optional<User> findByNickname(String nickname);
	
	Optional<User> findByEmail(String email);
}