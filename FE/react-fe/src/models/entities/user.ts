import {BasicEntity} from './superclasses/basic-entity';

export interface User extends BasicEntity<string> {
	readonly ownershipCode: string,
	forename: string,
	surname: string,
	email: string,
	nickname: string,
	password?: string,
}
