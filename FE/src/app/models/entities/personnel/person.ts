import {BasicEntity} from '../superclasses/basic-entity';

export interface Person extends BasicEntity<string> {
  forename: string,
  surname: string,
  birthdate: Date,
}
