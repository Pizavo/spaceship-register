import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Spaceship} from '../../models/entities/spaceship';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {TranslateService} from '@ngx-translate/core';
import {SpaceshipService} from '../../services/models/entities/spaceship/spaceship.service';
import {ServiceOptions} from '../../services/models/base-service';
import {finalize} from 'rxjs';
import {
  SpaceshipPositionService,
} from '../../services/models/entities/personnel/crew-position/spaceship-position.service';
import {SpaceshipPosition} from '../../models/entities/personnel/spaceship-position';

@Component({
             selector: 'app-spaceship-positions',
             templateUrl: './spaceship-positions.component.html',
             styleUrls: ['./spaceship-positions.component.scss'],
           })
export class SpaceshipPositionsComponent implements OnInit {
  public form = this.formBuilder.group(
    {
      name: ['', Validators.required],
      clearance: ['', Validators.required],
      description: [''],
    });
  public readonly translateUrl: string = 'components.spaceshipPositions';
  public spaceship?: Spaceship;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spaceshipService: SpaceshipService,
    private positionService: SpaceshipPositionService,
  ) {}

  private _id: string | null = null;

  public get id(): string | null {
    return this._id;
  }

  private set id(value: string | null) {
    this._id = value;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('position');
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
              const position = this.spaceship?.positions?.find(position => position.id === this.id);

              if (!position) {
                this.router.navigate([`/spaceship/${spaceship.id}/positions`]);
                return;
              }

              this.form.get('name')?.setValue(position!.name);
              this.form.get('clearance')?.setValue(position!.clearance.id!);
              this.form.get('description')?.setValue(position!.description);
            }
          });
  }

  onSubmit() {
    const position: SpaceshipPosition = {
      spaceship: this.spaceship!,
      name: this.form.get('name')!.value!,
      clearance: this.spaceship?.clearances?.find(clearance => clearance.id === this.form.get('clearance')!.value)!,
      description: this.form.get('description')!.value!,
    };

    const options: ServiceOptions = {
      errorMessages: {
        default: `${this.translateUrl}.error.${this.id ? 'update' : 'create'}`,
      },
    };

    if (!this.id) {
      this.positionService.create(position, options).subscribe(positionRes => {
        this.spaceship?.positions?.push(positionRes);

        this.translate.get(`${this.translateUrl}.success.create`).subscribe(message => this.notifier.notify('success', message));
      });
    } else {
      position.id = this.id;
      this.positionService.update(position, options).subscribe(positionRes => {
        const index = this.spaceship?.clearances?.findIndex(positionFound => positionFound.id === this.id);

        if (index !== undefined) {
          this.spaceship?.positions?.splice(index, 1, positionRes);
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

    this.positionService
        .delete(id, options)
        .subscribe(() => {
          const index = this.spaceship?.positions?.findIndex(positionFound => positionFound.id === id);

          if (index !== undefined) {
            const position: SpaceshipPosition = this.spaceship?.positions?.splice(index, 1)?.[0]!;

            if (this.id === position.id) {
              this.router.navigate([`/spaceship/${this.spaceship!.id}/positions`]);
            }

            this.translate.get(`${this.translateUrl}.success.delete`).subscribe(message => this.notifier.notify('success', message));
          }
        });
  }

  editPosition(positionId: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true})
        .then(() => this.router.navigate([`/spaceship/${this.spaceship!.id}/position/${positionId}`]));
  }
}
