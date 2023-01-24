package cz.osu.opr3.spaceshipregister.models.entities.components;

import cz.osu.opr3.spaceshipregister.models.entities.superclasses.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "component_producers")
public class ComponentProducer extends BaseEntity<UUID> {
	@Column(nullable = false, unique = true)
	private String name;
	
	@OneToMany(mappedBy = "producer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Core> cores = new ArrayList<>();
	
	@OneToMany(mappedBy = "producer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Engine> engines = new ArrayList<>();
	
	@OneToMany(mappedBy = "producer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<LifeSupportUnit> lifeSupportUnits = new ArrayList<>();
}