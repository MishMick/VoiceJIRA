declare var process:any;
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import './assets/css/styles.css';
import {AppModule} from './app/app.module';

if(process.env.envConfig.envName  === "PROD"){
    enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);