import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UtilsModule} from '../utils.module';

import {PageOverlaySpinnerComponent} from './page-overlay-spinner.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        UtilsModule
    ],
    declarations: [
        PageOverlaySpinnerComponent
    ],
    providers: [],
    exports: [
        PageOverlaySpinnerComponent
    ],
    bootstrap:[

    ]
})

export class PageOverlaySpinnerModule{
    
}