package cz.osu.opr3.spaceshipregister.services;

import cz.osu.opr3.spaceshipregister.models.entities.superclasses.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;
import java.util.Optional;

public class BaseService<ID extends Serializable, E extends BaseEntity<ID>, R extends JpaRepository<E, ID>> {
	protected final R repository;
	
	public BaseService(R repository) {
		this.repository = repository;
	}
	
	public Optional<E> get(ID id) {
		return this.repository.findById(id);
	}
	
	public Iterable<E> list() {
		return this.repository.findAll();
	}
	
	public E create(E entity) {
		return this.repository.save(entity);
	}
	
	public Optional<E> update(E entity) {
		Optional<E> foundEntity = this.repository.findById(entity.getId());
		
		if (foundEntity.isPresent()) {
			return Optional.of(this.repository.save(entity));
		}
		
		return Optional.empty();
	}
	
	public void delete(ID id) {
		this.repository.deleteById(id);
	}
}
