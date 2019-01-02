import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { ContainerComponent } from './container/container.component';
import { ContainerModule } from './container/container.module';
import { PageOverlaySpinnerModule } from './utils/page-overlay-spinner/page-overlay-spinner.module';
import { PageOverlaySpinnerComponent } from './utils/page-overlay-spinner/page-overlay-spinner.component';
import {LeftNavbarComponent} from './utils/left-navbar/left-navbar.component';
import {FooterComponent} from './utils/footer/footer.component';
import {HeaderComponent} from './utils/header/header.component';
import {AppComponent} from './app.component';
import { UtilsModule } from './utils/utils.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
    declarations: [
        AppComponent,
        LeftNavbarComponent,  
        FooterComponent,
        HeaderComponent],
    imports: [
        BrowserModule,
        ContainerModule,
        AngularFontAwesomeModule,
        PageOverlaySpinnerModule,
        UtilsModule
    ],
    exports: [
        AppComponent,
        FooterComponent,
        HeaderComponent
    ],
    providers: [],
    bootstrap: [
        AppComponent,
        ContainerComponent,
        PageOverlaySpinnerComponent,
        LeftNavbarComponent,
        FooterComponent,
        HeaderComponent   
    ],
})
export class AppModule{

}

