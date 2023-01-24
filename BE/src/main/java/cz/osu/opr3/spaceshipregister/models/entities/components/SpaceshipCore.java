package cz.osu.opr3.spaceshipregister.models.entities.components;

import cz.osu.opr3.spaceshipregister.models.entities.Spaceship;
import cz.osu.opr3.spaceshipregister.models.entities.superclasses.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "spaceship_cores")
public class SpaceshipCore extends BaseEntity<UUID> {
	@OneToOne(optional = false)
	@JoinColumn(name = "spaceship_id", nullable = false)
	private Spaceship spaceship;
	
	@Column(nullable = false)
	private String aiVersion;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "core_id", nullable = false)
	private Core type;
	
}