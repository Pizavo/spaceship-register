import {ComponentProducer} from '../components/component-producer';
import {BasicEntity} from './basic-entity';

export interface Component extends BasicEntity<string> {
	readonly cid: string,
	name: string,
	producer: ComponentProducer,
	powerConsumption: bigint,
}
