import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Spaceship} from '../../models/entities/spaceship';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {TranslateService} from '@ngx-translate/core';
import {SpaceshipService} from '../../services/models/entities/spaceship/spaceship.service';
import {CrewMemberService} from '../../services/models/entities/personnel/crew-member/crew-member.service';
import {ServiceOptions} from '../../services/models/base-service';
import {finalize} from 'rxjs';
import {CrewMember} from '../../models/entities/personnel/crew-member';
import {PersonService} from '../../services/models/entities/personnel/person/person.service';
import {Person} from '../../models/entities/personnel/person';

@Component({
             selector: 'app-spaceship-crew',
             templateUrl: './spaceship-crew.component.html',
             styleUrls: ['./spaceship-crew.component.scss'],
           })
export class SpaceshipCrewComponent implements OnInit {
  public form = this.formBuilder.group(
    {
      person: ['', Validators.required],
      position: ['', Validators.required],
      specialClearance: [''],
    });
  public readonly translateUrl: string = 'components.crew';
  public spaceship?: Spaceship;
  public people: Person[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spaceshipService: SpaceshipService,
    private crewService: CrewMemberService,
    private personService: PersonService,
  ) {}

  private _id: string | null = null;

  public get id(): string | null {
    return this._id;
  }

  private set id(value: string | null) {
    this._id = value;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('member');
    const spaceshipId = this.route.snapshot.paramMap.get('spaceship');

    if (!spaceshipId) {
      this.router.navigate(['/overview']);
      return;
    }

    const options: ServiceOptions = {
      errorMessages: {
        default: `${this.translateUrl}.error.load`,
      },
    };

    this.personService.listFree({errorMessages: {default: `${this.translateUrl}.error.load`}})
        .subscribe(
          people => {
            this.people = people;

            this.spaceshipService.get(spaceshipId!, options)
                .pipe(
                  finalize(
                    () => {
                      if (!this.spaceship) {
                        this.router.navigate(['/overview']);
                      }
                    },
                  ))
                .subscribe(
                  spaceship => {
                    this.spaceship = spaceship;

                    if (this.id) {
                      const member = this.spaceship?.crew?.find(member => member.id === this.id);

                      if (!member) {
                        this.router.navigate([`/spaceship/${spaceship.id}/crew`]);
                        return;
                      }

                      this.people.push(member.person);
                      this.form.get('person')?.disable();

                      this.form.get('person')?.setValue(member!.person.id!);
                      this.form.get('position')?.setValue(member!.position.id!);
                      this.form.get('specialClearance')?.setValue(member!.specialClearance?.id!);
                    }
                  });
          });
  }

  onSubmit() {
    const member: CrewMember = {
      spaceship: this.spaceship!,
      person: this.people.find(person => person.id === this.form.get('person')!.value)!,
      specialClearance: this.spaceship?.clearances?.find(clearance => clearance.id === this.form.get('specialClearance')!.value)!,
      position: this.spaceship?.positions?.find(position => position.id === this.form.get('position')!.value)!,
    };

    const options: ServiceOptions = {
      errorMessages: {
        default: `${this.translateUrl}.error.${this.id ? 'update' : 'create'}`,
      },
    };

    if (!this.id) {
      this.crewService.create(member, options).subscribe(memberRes => {
        this.spaceship?.crew?.push(memberRes);

        this.translate.get(`${this.translateUrl}.success.create`).subscribe(message => this.notifier.notify('success', message));
      });
    } else {
      member.id = this.id;
      this.crewService.update(member, options).subscribe(memberRes => {
        const index = this.spaceship?.clearances?.findIndex(memberFound => memberFound.id === this.id);

        if (index !== undefined) {
          this.spaceship?.crew?.splice(index, 1, memberRes);
        }

        this.translate.get(`${this.translateUrl}.success.update`).subscribe(message => this.notifier.notify('success', message));
      });
    }
  }

  onDelete(id: string) {
    const options: ServiceOptions = {
      errorMessages: {
        default: `${this.translateUrl}.error.delete`,
      },
    };

    this.crewService
        .delete(id, options)
        .subscribe(() => {
          const index = this.spaceship?.crew?.findIndex(memberFound => memberFound.id === id);

          if (index !== undefined) {
            const member: CrewMember = this.spaceship?.crew?.splice(index, 1)?.[0]!;

            if (this.id === member.id) {
              this.router.navigate([`/spaceship/${this.spaceship!.id}/crew`]);
            }

            this.translate.get(`${this.translateUrl}.success.delete`).subscribe(message => this.notifier.notify('success', message));
          }
        });
  }

  editMember(memberId: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true})
        .then(() => this.router.navigate([`/spaceship/${this.spaceship!.id}/member/${memberId}`]));
  }
}
