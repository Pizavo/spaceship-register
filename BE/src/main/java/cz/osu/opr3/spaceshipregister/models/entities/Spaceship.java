package cz.osu.opr3.spaceshipregister.models.entities;

import cz.osu.opr3.spaceshipregister.models.entities.components.SpaceshipCore;
import cz.osu.opr3.spaceshipregister.models.entities.components.SpaceshipEngine;
import cz.osu.opr3.spaceshipregister.models.entities.components.SpaceshipLifeSupportUnit;
import cz.osu.opr3.spaceshipregister.models.entities.credentials.User;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.CrewMember;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.SpaceshipClearance;
import cz.osu.opr3.spaceshipregister.models.entities.personnel.SpaceshipPosition;
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
@Table(name = "spaceships")
public class Spaceship extends BaseEntity<UUID> {
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private Boolean commission;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User owner;
	
	@OneToOne(mappedBy = "spaceship", cascade = CascadeType.ALL, orphanRemoval = true)
	private SpaceshipCore core;
	
	@OneToOne(mappedBy = "spaceship", cascade = CascadeType.ALL, orphanRemoval = true)
	private SpaceshipEngine engine;
	
	@OneToOne(mappedBy = "spaceship", cascade = CascadeType.ALL, orphanRemoval = true)
	private SpaceshipLifeSupportUnit lifeSupportUnit;
	
	@OneToMany(mappedBy = "spaceship", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("level")
	private List<SpaceshipClearance> clearances = new ArrayList<>();
	
	@OneToMany(mappedBy = "spaceship", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<CrewMember> crew = new ArrayList<>();
	
	@OneToMany(mappedBy = "spaceship", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SpaceshipPosition> positions = new ArrayList<>();
}
