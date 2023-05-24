import {Spaceship} from '../spaceship';
import {LifeSupportUnit} from './life-support-unit';
import {BasicEntity} from '../superclasses/basic-entity';

export interface SpaceshipLifeSupportUnit extends BasicEntity<string> {
  spaceship?: Spaceship,
  type: LifeSupportUnit,
  lastMaintenance: Date,
}
