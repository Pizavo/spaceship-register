package cz.osu.opr3.spaceshipregister.models.entities.superclasses;

import cz.osu.opr3.spaceshipregister.models.entities.components.ComponentProducer;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import java.util.UUID;

@Data
@NoArgsConstructor
@MappedSuperclass
public class Component extends BaseEntity<UUID> {
	@Setter(AccessLevel.NONE)
	@Column(nullable = false, unique = true)
	private UUID cid;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private Long powerConsumption;
	
	@ManyToOne(optional = false)
	@JoinColumn(nullable = false)
	private ComponentProducer producer;
}
