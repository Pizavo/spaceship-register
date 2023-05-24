import {SpaceshipClearance} from './spaceship-clearance';
import {Spaceship} from '../spaceship';
import {BasicEntity} from '../superclasses/basic-entity';

export interface SpaceshipPosition extends BasicEntity<string> {
	name: string,
	description: string,
	spaceship: Spaceship,
	clearance: SpaceshipClearance,
}
