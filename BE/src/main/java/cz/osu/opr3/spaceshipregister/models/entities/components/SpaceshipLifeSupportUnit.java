package cz.osu.opr3.spaceshipregister.models.entities.components;

import cz.osu.opr3.spaceshipregister.models.entities.Spaceship;
import cz.osu.opr3.spaceshipregister.models.entities.superclasses.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Calendar;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Entity
@Table(name = "spaceship_life_support_units")
public class SpaceshipLifeSupportUnit extends BaseEntity<UUID> {
	@OneToOne(optional = false)
	@JoinColumn(name = "spaceship_id", nullable = false, unique = true)
	private Spaceship spaceship;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "life_support_unit_id", nullable = false)
	private LifeSupportUnit type;
	
	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	private Calendar lastMaintenance;
}