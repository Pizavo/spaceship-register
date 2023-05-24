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
@Table(name = "life_support_units")
public class LifeSupportUnit extends Component {
	@Column(nullable = false)
	private Integer passengerCapacity;
	
	@OneToMany(mappedBy = "type", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SpaceshipLifeSupportUnit> spaceshipLifeSupportUnits = new ArrayList<>();
	
}