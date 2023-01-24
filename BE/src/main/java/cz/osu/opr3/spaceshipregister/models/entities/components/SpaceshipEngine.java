package cz.osu.opr3.spaceshipregister.models.entities.components;

import cz.osu.opr3.spaceshipregister.models.entities.Spaceship;
import cz.osu.opr3.spaceshipregister.models.entities.superclasses.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Calendar;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "spaceship_engines")
public class SpaceshipEngine extends BaseEntity<UUID> {
	@OneToOne(optional = false)
	@JoinColumn(name = "spaceship_id", nullable = false, unique = true)
	private Spaceship spaceship;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "engine_id", nullable = false)
	private Engine type;
	
	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	private Calendar lastRevision;
}