import {Injectable} from '@angular/core';
import {CrewMember} from '../../../../../models/entities/personnel/crew-member';
import {BaseService} from '../../../base-service';

@Injectable({
              providedIn: 'root',
            })
export class CrewMemberService extends BaseService<CrewMember> {
  constructor() {
    super('/crew-member');
  }
}
