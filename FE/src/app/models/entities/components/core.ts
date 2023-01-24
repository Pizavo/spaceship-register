import {Component} from '../superclasses/component';

export interface Core extends Component {
  computationPower: bigint,
  fullyConscious: boolean,
  helmControl: boolean,
}
