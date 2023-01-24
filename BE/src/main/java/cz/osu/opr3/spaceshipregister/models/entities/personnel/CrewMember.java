package cz.osu.opr3.spaceshipregister.models.entities.personnel;

import cz.osu.opr3.spaceshipregister.models.entities.Spaceship;
import cz.osu.opr3.spaceshipregister.models.entities.superclasses.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "crew_members")
public class CrewMember extends BaseEntity<UUID> {
	@OneToOne(optional = false)
	@JoinColumn(name = "person_id", unique = true)
	private Person person;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "crew_position_id", nullable = false)
	private SpaceshipPosition position;
	
	@ManyToOne
	@JoinColumn(name = "special_spaceship_clearance_id")
	private SpaceshipClearance specialClearance;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "spaceship_id", nullable = false)
	private Spaceship spaceship;
	
}