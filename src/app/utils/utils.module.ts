import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  MatRadioModule,
  MatCheckboxModule
} from "@angular/material";
import {HttpServicesModule} from '../services/http/http-services.module';
import {ModalModule} from "ngx-bootstrap";
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { AmountFieldDirective } from '../utils/directives/amount-field.directive';
import {NumberValidatorService} from '../utils/validators/number-validators.service';
import {ErrorDisplayComponent} from '../utils/error-display/error-display.component';
import {AmountFormatFilter} from '../utils/amount-format/amount.format.filter';
import {SimpleDropdownComponent} from '../utils/simple-dropdown/simple-dropdown.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpServicesModule,
    ModalModule.forRoot(),
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  declarations: [
    AmountFieldDirective,
    ErrorDisplayComponent,
    AmountFormatFilter,
    SimpleDropdownComponent
  ],
  exports: [
    AmountFieldDirective,
    ErrorDisplayComponent,
    AmountFormatFilter,
    SimpleDropdownComponent
  ],
  providers: [
    NumberValidatorService
  ],
  bootstrap: [
    
  ]
})
export class UtilsModule {

}
