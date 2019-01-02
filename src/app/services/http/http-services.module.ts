import {NgModule} from '@angular/core';
import {HttpService} from './http.service';
import {EndPointService} from './endpoint.service';
import {HttpHelperService} from './http-helper.service';

@NgModule({
    providers: [
        HttpHelperService,
        EndPointService,
        HttpService
    ]
})

export class HttpServicesModule{}