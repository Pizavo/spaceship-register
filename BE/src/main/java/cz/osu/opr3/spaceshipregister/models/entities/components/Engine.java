package cz.osu.opr3.spaceshipregister.models.entities.components;

import cz.osu.opr3.spaceshipregister.models.entities.superclasses.Component;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Entity
@Table(name = "engines")
public class Engine extends Component {
	@Column(nullable = false)
	private Long maxSpeed;
	
	@Column(nullable = false)
	private Double acceleration;
	
	@OneToMany(mappedBy = "type", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SpaceshipEngine> spaceshipEngines = new ArrayList<>();
}