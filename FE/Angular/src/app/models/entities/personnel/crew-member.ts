import {Person} from './person';
import {SpaceshipPosition} from './spaceship-position';
import {SpaceshipClearance} from './spaceship-clearance';
import {Spaceship} from '../spaceship';
import {BasicEntity} from '../superclasses/basic-entity';

export interface CrewMember extends BasicEntity<string> {
  person: Person,
  position: SpaceshipPosition,
  specialClearance: SpaceshipClearance,
  spaceship: Spaceship,
}
