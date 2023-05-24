import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SpaceshipService} from '../../services/models/entities/spaceship/spaceship.service';
import {Spaceship} from '../../models/entities/spaceship';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceOptions} from '../../services/models/base-service';
import {Core} from '../../models/entities/components/core';
import {Engine} from '../../models/entities/components/engine';
import {LifeSupportUnit} from '../../models/entities/components/life-support-unit';
import {CoreService} from '../../services/models/entities/components/core/core.service';
import {EngineService} from '../../services/models/entities/components/engine/engine.service';
import {
  LifeSupportUnitService,
} from '../../services/models/entities/components/life-support-unit/life-support-unit.service';
import {PersonService} from '../../services/models/entities/personnel/person/person.service';
import {DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {finalize} from 'rxjs';
import {DateTime} from 'luxon';

@Component({
             selector: 'app-spaceship-form',
             templateUrl: './spaceship-form.component.html',
             styleUrls: ['./spaceship-form.component.scss'],
           })
export class SpaceshipFormComponent implements OnInit {
  formCreate: FormGroup = this.formBuilder.group(
    {
      name: ['', Validators.required],
      commission: [false],
    });

  formUpdate: FormGroup = this.formBuilder.group(
    {
      name: ['', Validators.required],
      commission: [false],
      core: [null, Validators.required],
      coreAiVersion: ['1.0.0', Validators.required],
      engine: [null, Validators.required],
      engineLastRevision: [null, Validators.required],
      lifeSupportUnit: [null, Validators.required],
      lifeSupportUnitLastMaintenance: [null, Validators.required],
    });

  public cores: Core[] = [];
  public engines: Engine[] = [];
  public lifeSupportUnits: LifeSupportUnit[] = [];
  private spaceship?: Spaceship;
  private datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    private spaceshipService: SpaceshipService,
    private coreService: CoreService,
    private engineService: EngineService,
    private lifeSupportUnitService: LifeSupportUnitService,
    private personService: PersonService,
    private notifier: NotifierService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
  ) { }

  private _id: string | null = null;

  public get id(): string | null {
    return this._id;
  }

  private set id(value: string | null) {
    this._id = value;
  }

  get isUpdate(): boolean {
    return !!this.id;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('spaceship');

    if (this.id) {
      const options: ServiceOptions = {
        errorMessages: {
          default: 'components.spaceshipForm.error.load',
        },
      };

      this.spaceshipService.get(this.id, options)
          .pipe(finalize(() => {
            if (!this.spaceship) {
              this.router.navigate(['/overview']);
            }
          }))
          .subscribe(
            spaceship => {
              this.spaceship = spaceship;

              this.formUpdate.get('name')!.setValue(spaceship.name);
              this.formUpdate.get('commission')!.setValue(spaceship.commission);
              this.formUpdate.get('core')!.setValue(spaceship.core?.type.id);
              this.formUpdate.get('coreAiVersion')!.setValue(spaceship.core?.aiVersion);
              this.formUpdate.get('engine')!.setValue(spaceship.engine?.type.id);
              this.formUpdate.get('engineLastRevision')!.setValue(this.datePipe.transform(spaceship.engine?.lastRevision, 'yyyy-MM-dd'));
              this.formUpdate.get('lifeSupportUnit')!.setValue(spaceship.lifeSupportUnit?.type.id);
              this.formUpdate.get('lifeSupportUnitLastMaintenance')!.setValue(this.datePipe.transform(spaceship.lifeSupportUnit?.lastMaintenance, 'yyyy-MM-dd'));
            },
          );

      this.coreService.list().subscribe(cores => this.cores = cores);
      this.engineService.list().subscribe(engines => this.engines = engines);
      this.lifeSupportUnitService.list().subscribe(lifeSupportUnits => this.lifeSupportUnits = lifeSupportUnits);
    }
  }

  dateInputToLuxonDateTime(date: Date): DateTime {
    let transformed = DateTime.fromJSDate(date);

    if (!transformed.isValid) {
      transformed = DateTime.fromISO(date.toString());
    }

    return transformed.set({day: transformed.day + 1, hour: 0, minute: 0, second: 0, millisecond: 0});
  }

  onSubmit() {
    const options: ServiceOptions = {
      errorMessages: {
        default: `components.spaceshipForm.error.${this.id ? 'update' : 'create'}`,
      },
    };

    if (this.id) {
      const spaceship: Spaceship = {
        id: this.id,
        name: this.formUpdate.get('name')!.value,
        commission: this.formUpdate.get('commission')!.value,
      };

      spaceship.core = {
        spaceship: this.spaceship!,
        type: this.cores.find(core => core.id === this.formUpdate.get('core')!.value)!,
        aiVersion: this.formUpdate.get('coreAiVersion')!.value,
      };

      const lastRevision = this.dateInputToLuxonDateTime(this.formUpdate.get('engineLastRevision')!.value);

      spaceship.engine = {
        spaceship: this.spaceship!,
        type: this.engines.find(engine => engine.id === this.formUpdate.get('engine')!.value)!,
        lastRevision: lastRevision.toJSDate(),
      };

      const lastMaintenance = this.dateInputToLuxonDateTime(this.formUpdate.get('lifeSupportUnitLastMaintenance')!.value);

      spaceship.lifeSupportUnit = {
        spaceship: this.spaceship!,
        type: this.lifeSupportUnits.find(lifeSupportUnit => lifeSupportUnit.id === this.formUpdate.get('lifeSupportUnit')!.value)!,
        lastMaintenance: lastMaintenance.toJSDate(),
      };

      this.spaceshipService.update(spaceship, options).subscribe(
        () => this.translate.get('components.spaceshipForm.success.update')
                  .subscribe(message => this.notifier.notify('success', message)),
      );
    } else {
      const spaceship: Spaceship = {
        name: this.formCreate.get('name')!.value,
        commission: this.formCreate.get('commission')!.value,
      };

      this.spaceshipService.create(spaceship, options).subscribe(
        () => {
          this.translate.get('components.spaceshipForm.success.create')
              .subscribe(message => this.notifier.notify('success', message));
          this.router.navigate(['../'], {relativeTo: this.route});
        });
    }
  }
}
