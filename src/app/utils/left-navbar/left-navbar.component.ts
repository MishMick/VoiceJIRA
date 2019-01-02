import { Component, Input, Inject } from '@angular/core';
import { Content } from '../../app.contants';
import { NavigationObservableService } from '../../services/data/navigation-observable.service';
declare var require: any;

@Component({
  selector: 'left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css'],
  providers: [NavigationObservableService]

})

export class LeftNavbarComponent {

  constructor(private _navigator: NavigationObservableService) {

  }

  onClick(event: any) {
    console.warn("Event ", event.target.id);
    this._navigator.setNavigatorTag(event.target.id);
  }

}
