import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CoreService} from '../../services/models/entities/components/core/core.service';
import {EngineService} from '../../services/models/entities/components/engine/engine.service';
import {
  LifeSupportUnitService,
} from '../../services/models/entities/components/life-support-unit/life-support-unit.service';
import {Core} from '../../models/entities/components/core';
import {Engine} from '../../models/entities/components/engine';
import {LifeSupportUnit} from '../../models/entities/components/life-support-unit';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';

@Component(
  {
    selector: 'app-spaceship-components-overview',
    templateUrl: './spaceship-components-overview.component.html',
    styleUrls: ['./spaceship-components-overview.component.scss'],
  })
export class SpaceshipComponentsOverviewComponent implements OnInit, AfterViewInit {
  cores = new MatTableDataSource<Core>();
  coresColumns: string[] = ['name', 'powerConsumption', 'computationPower', 'fullyConscious', 'helmControl'];
  @ViewChild('coresTable', {read: MatSort, static: true}) coresSort: MatSort = new MatSort();
  @ViewChild('coresPaginator', {
    read: MatPaginator,
    static: true,
  }) coresPaginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  engines = new MatTableDataSource<Engine>();
  enginesColumns: string[] = ['name', 'powerConsumption', 'acceleration', 'maxSpeed'];
  @ViewChild('enginesTable', {read: MatSort, static: true}) enginesSort: MatSort = new MatSort();
  @ViewChild('enginesPaginator', {
    read: MatPaginator,
    static: true,
  }) enginesPaginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  lifeSupportUnits = new MatTableDataSource<LifeSupportUnit>();
  lifeSupportUnitsColumns: string[] = ['name', 'powerConsumption', 'passengerCapacity'];
  @ViewChild('lifeSupportUnitsTable', {read: MatSort, static: true}) lifeSupportUnitsSort: MatSort = new MatSort();
  @ViewChild('lifeSupportUnitsPaginator', {
    read: MatPaginator,
    static: true,
  }) lifeSupportUnitsPaginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  constructor(
    private coreService: CoreService,
    private engineService: EngineService,
    private lifeSupportUnitService: LifeSupportUnitService,
  ) { }

  ngOnInit(): void {
    this.coreService.list().subscribe(cores => this.cores.data = cores);
    this.engineService.list().subscribe(engines => this.engines.data = engines);
    this.lifeSupportUnitService.list().subscribe(lifeSupportUnits => this.lifeSupportUnits.data = lifeSupportUnits);
  }

  ngAfterViewInit(): void {
    this.cores.sort = this.coresSort;
    this.cores.paginator = this.coresPaginator;

    this.engines.sort = this.enginesSort;
    this.engines.paginator = this.enginesPaginator;

    this.lifeSupportUnits.sort = this.lifeSupportUnitsSort;
    this.lifeSupportUnits.paginator = this.lifeSupportUnitsPaginator;
  }
}
