package cz.osu.opr3.spaceshipregister.models.entities.personnel;

import cz.osu.opr3.spaceshipregister.models.entities.superclasses.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Calendar;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "people")
public class Person extends BaseEntity<UUID> {
	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	private Calendar birthdate;
	
	@Column(nullable = false)
	private String surname;
	
	@Column(nullable = false)
	private String forename;
	
	@OneToOne(mappedBy = "person", cascade = CascadeType.ALL, orphanRemoval = true)
	private CrewMember member;
}