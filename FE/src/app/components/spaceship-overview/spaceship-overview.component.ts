import {Component, OnInit} from '@angular/core';
import {SpaceshipService} from '../../services/models/entities/spaceship/spaceship.service';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {Spaceship} from '../../models/entities/spaceship';
import {NotifierService} from 'angular-notifier';
import {TranslateService} from '@ngx-translate/core';
import {ServiceOptions} from '../../services/models/base-service';

@Component({
             selector: 'app-spaceship-overview',
             templateUrl: './spaceship-overview.component.html',
             styleUrls: ['./spaceship-overview.component.scss'],
           })
export class SpaceshipOverviewComponent implements OnInit {

  spaceships: Spaceship[] = [];
  translateUrl = 'components.spaceshipOverview';

  constructor(
    private spaceshipService: SpaceshipService,
    private authService: AuthenticationService,
    private notifier: NotifierService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.spaceshipService
        .listByOwner()
        .subscribe(spaceships => {
          this.spaceships = spaceships;
        });
  }

  onDelete(id: string) {
    const options: ServiceOptions = {
      errorMessages: {
        default: `${this.translateUrl}.error.delete`,
      },
    };

    this.spaceshipService
        .delete(id, options)
        .subscribe(() => {
          this.translate.get(`${this.translateUrl}.success.delete`)
              .subscribe((message: string) => this.notifier.notify('success', message));
          this.spaceships = this.spaceships.filter((spaceship) => spaceship.id !== id);
        });
  }
}
