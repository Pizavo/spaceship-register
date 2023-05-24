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
@Table(name = "spaceship_clearances", uniqueConstraints = {@UniqueConstraint(columnNames = {"spaceship_id", "level"})})
public class SpaceshipClearance extends BaseEntity<UUID> {
	@ManyToOne(optional = false)
	@JoinColumn(name = "spaceship_id", nullable = false)
	private Spaceship spaceship;
	
	@Column(nullable = false)
	private Integer level;
	
	@OneToMany(mappedBy = "clearance", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SpaceshipPosition> positions = new ArrayList<>();
	
	@OneToMany(mappedBy = "specialClearance", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<CrewMember> members = new ArrayList<>();
	
}