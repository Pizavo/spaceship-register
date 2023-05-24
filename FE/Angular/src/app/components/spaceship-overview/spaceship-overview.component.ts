import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SpaceshipService} from '../../services/models/entities/spaceship/spaceship.service';
import {Spaceship} from '../../models/entities/spaceship';
import {NotifierService} from 'angular-notifier';
import {TranslateService} from '@ngx-translate/core';
import {ServiceOptions} from '../../services/models/base-service';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component(
  {
    selector: 'app-spaceship-overview',
    templateUrl: './spaceship-overview.component.html',
    styleUrls: ['./spaceship-overview.component.scss'],
  })
export class SpaceshipOverviewComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'commission', 'actions'];
  spaceships: Spaceship[] = [];
  translateUrl = 'components.spaceshipOverview';
  dataSource = new MatTableDataSource<Spaceship>();

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  search: string = '';

  constructor(
    private spaceshipService: SpaceshipService,
    private notifier: NotifierService,
    private translate: TranslateService,
  ) {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.spaceshipService
        .listByOwner()
        .subscribe(spaceships => {
          this.spaceships = spaceships;
          this.dataSource.data = spaceships;
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

  doSearch() {
    this.dataSource.filter = this.search.trim().toLowerCase();
  }
}
