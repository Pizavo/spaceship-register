import {Spaceship} from '../spaceship';
import {Engine} from './engine';
import {BasicEntity} from '../superclasses/basic-entity';

export interface SpaceshipEngine extends BasicEntity<string> {
  spaceship?: Spaceship,
  type: Engine,
  lastRevision: Date,
}
