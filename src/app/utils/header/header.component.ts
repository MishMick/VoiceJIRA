import { Component, OnInit } from '@angular/core';
import { NavigationObservableService } from '../../services/data/navigation-observable.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NavigationObservableService]
})
export class HeaderComponent implements OnInit {

  constructor(private _navigator: NavigationObservableService) { }

  ngOnInit() {
  }

  onClick(event: any) {
    console.warn("Event info ", event.target.id);
    this._navigator.setNavigatorTag(event.target.id);
  }

}
