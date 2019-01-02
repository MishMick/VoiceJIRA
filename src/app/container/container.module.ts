import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UtilsModule} from '../utils/utils.module';
import {ContainerComponent} from './container.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
@NgModule({
  declarations: [
    ContainerComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UtilsModule
  ],
  exports: [
    ContainerComponent
  ],
  providers: [ContainerComponent,DashboardComponent],
  bootstrap: []
})
export class ContainerModule {

}

