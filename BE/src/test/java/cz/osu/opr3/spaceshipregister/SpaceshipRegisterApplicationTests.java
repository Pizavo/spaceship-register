package cz.osu.opr3.spaceshipregister;

import cz.osu.opr3.spaceshipregister.models.entities.components.ComponentProducer;
import cz.osu.opr3.spaceshipregister.services.components.ComponentProducerService;
import io.jsonwebtoken.lang.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SpaceshipRegisterApplicationTests {
	@Autowired
	private ComponentProducerService componentProducerService;
	
	@Test
	void saveComponentProducerToDBAndFindFromDBById() {
		ComponentProducer componentProducer = new ComponentProducer();
		componentProducer.setName("Test");
		
		this.componentProducerService.create(componentProducer);
		
		Assert.notNull(this.componentProducerService.get(componentProducer.getId()).orElse(null));
	}
	
	@Test
	void findComponentProducerByNameAndDeleteFromDBById() {
		ComponentProducer componentProducer = this.componentProducerService.getByName("Test");
		
		Assert.notNull(componentProducer);
		
		this.componentProducerService.delete(componentProducer.getId());
		
		Assert.isNull(this.componentProducerService.get(componentProducer.getId()).orElse(null));
	}
}
