import {Component} from '../superclasses/component';

export interface Engine extends Component {
  acceleration: number,
  maxSpeed: bigint,
}
