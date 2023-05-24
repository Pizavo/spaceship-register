package cz.osu.opr3.spaceshipregister.models.entities.personnel;

import cz.osu.opr3.spaceshipregister.models.entities.Spaceship;
import cz.osu.opr3.spaceshipregister.models.entities.superclasses.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Entity
@Table(name = "spaceship_positions", uniqueConstraints = {@UniqueConstraint(columnNames = {"spaceship_id", "name"})})
public class SpaceshipPosition extends BaseEntity<UUID> {
	@Column(nullable = false, length = 1024)
	private String description;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "spaceship_clearance_id", nullable = false)
	private SpaceshipClearance clearance;
	
	@Column(nullable = false)
	private String name;
	
	@OneToMany(mappedBy = "position", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<CrewMember> crewMembers = new ArrayList<>();
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "spaceship_id", nullable = false)
	private Spaceship spaceship;
}