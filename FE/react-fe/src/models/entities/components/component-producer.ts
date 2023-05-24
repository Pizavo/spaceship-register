import {BasicEntity} from '../superclasses/basic-entity';

export interface ComponentProducer extends BasicEntity<string> {
	name: string,
}
