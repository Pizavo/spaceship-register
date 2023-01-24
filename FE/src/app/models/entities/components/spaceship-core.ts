import {Spaceship} from '../spaceship';
import {Core} from './core';
import {BasicEntity} from '../superclasses/basic-entity';

export interface SpaceshipCore extends BasicEntity<string> {
  spaceship: Spaceship,
  type: Core,
  aiVersion: string,
}
