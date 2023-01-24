package cz.osu.opr3.spaceshipregister.models.entities.components;

import cz.osu.opr3.spaceshipregister.models.entities.superclasses.Component;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "cores")
public class Core extends Component {
	@Column(nullable = false)
	private Boolean helmControl = false;
	
	@Column(nullable = false)
	private Boolean fullyConscious = false;
	
	@Column(nullable = false)
	private Long computationPower;
	
	@OneToMany(mappedBy = "type", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SpaceshipCore> spaceshipCores = new ArrayList<>();
	
}