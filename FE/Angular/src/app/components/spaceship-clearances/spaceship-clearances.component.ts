import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SpaceshipService} from '../../services/models/entities/spaceship/spaceship.service';
import {Spaceship} from '../../models/entities/spaceship';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs';
import {
  SpaceshipClearanceService,
} from '../../services/models/entities/personnel/spaceship-clearance/spaceship-clearance.service';
import {SpaceshipClearance} from '../../models/entities/personnel/spaceship-clearance';
import {ServiceOptions} from '../../services/models/base-service';
import {TranslateService} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';

@Component({
             selector: 'app-spaceship-clearances',
             templateUrl: './spaceship-clearances.component.html',
             styleUrls: ['./spaceship-clearances.component.scss'],
           })
export class SpaceshipClearancesComponent implements OnInit {
  public form = this.formBuilder.group(
    {
      level: [1, [Validators.required, Validators.min(1)]],
    });
  public readonly translateUrl: string = 'components.spaceshipClearances';
  public spaceship?: Spaceship;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spaceshipService: SpaceshipService,
    private clearanceService: SpaceshipClearanceService,
  ) {}

  private _id: string | null = null;

  public get id(): string | null {
    return this._id;
  }

  private set id(value: string | null) {
    this._id = value;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('clearance');
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
              const clearance = this.spaceship?.clearances?.find(clearance => clearance.id === this.id);

              if (!clearance) {
                this.router.navigate([`/spaceship/${spaceship.id}/clearances`]);
                return;
              }

              this.form.get('level')?.setValue(clearance!.level);
            }
          });
  }

  onSubmit() {
    const clearance: SpaceshipClearance = {
      spaceship: this.spaceship!,
      level: this.form.get('level')!.value!,
    };

    const options: ServiceOptions = {
      errorMessages: {
        default: `${this.translateUrl}.error.${this.id ? 'update' : 'create'}`,
      },
    };

    if (!this.id) {
      this.clearanceService.create(clearance, options).subscribe(clearanceRes => {
        this.spaceship?.clearances?.push(clearanceRes);

        this.translate.get(`${this.translateUrl}.success.create`).subscribe(message => this.notifier.notify('success', message));
      });
    } else {
      clearance.id = this.id;
      this.clearanceService.update(clearance, options).subscribe(clearanceRes => {
        const index = this.spaceship?.clearances?.findIndex(clearanceFound => clearanceFound.id === this.id);

        if (index !== undefined) {
          this.spaceship?.clearances?.splice(index, 1, clearanceRes);
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

    this.clearanceService
        .delete(id, options)
        .subscribe(() => {
          const index = this.spaceship?.clearances?.findIndex(clearanceFound => clearanceFound.id === id);

          if (index !== undefined) {
            const clearance: SpaceshipClearance = this.spaceship?.clearances?.splice(index, 1)?.[0]!;

            if (this.id === clearance.id) {
              this.router.navigate([`/spaceship/${this.spaceship!.id}/clearances`]);
            }

            this.translate.get(`${this.translateUrl}.success.delete`)
                .subscribe((message: string) => this.notifier.notify('success', message));
          }
        });
  }

  editClearance(clearanceId: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true})
        .then(() => this.router.navigate([`/spaceship/${this.spaceship!.id}/clearance/${clearanceId}`]));
  }
}
