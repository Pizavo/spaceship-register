import {Spaceship} from '../spaceship';
import {BasicEntity} from '../superclasses/basic-entity';

export interface SpaceshipClearance extends BasicEntity<string> {
  spaceship: Spaceship,
  level: number,
}
