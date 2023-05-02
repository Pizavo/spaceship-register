import {User} from './user';
import {BasicEntity} from './superclasses/basic-entity';
import {SpaceshipCore} from './components/spaceship-core';
import {SpaceshipEngine} from './components/spaceship-engine';
import {SpaceshipLifeSupportUnit} from './components/spaceship-life-support-unit';
import {SpaceshipClearance} from './personnel/spaceship-clearance';
import {SpaceshipPosition} from './personnel/spaceship-position';
import {CrewMember} from './personnel/crew-member';

export interface Spaceship extends BasicEntity<string> {
  name: string,
  owner?: User,
  commission: boolean,
  core?: SpaceshipCore,
  engine?: SpaceshipEngine,
  lifeSupportUnit?: SpaceshipLifeSupportUnit,
  clearances?: SpaceshipClearance[],
  positions?: SpaceshipPosition[],
  crew?: CrewMember[],
}
