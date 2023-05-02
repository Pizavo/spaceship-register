import {Injector} from '@angular/core';

export class AppInjector {
  private static _injector: Injector;

  static get injector(): Injector {
    return this._injector;
  }

  static set injector(injector: Injector) {
    this._injector = injector;
  }
}
