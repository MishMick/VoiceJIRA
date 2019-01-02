import { Injectable } from '@angular/core';
import { ENDPOINTLIST } from './endpoint.list';

@Injectable()
export class EndPointService {

    private list: Object;
    constructor() {
        this.list = ENDPOINTLIST;
    }

    getEndPoint(endPointName: string): any {
        let nameArray = endPointName.split(".");
        if (this.list.hasOwnProperty(nameArray[0])) {
            return this.list[nameArray[0]][nameArray[1]];
        }
        return null;
    }

    //RETURNS LIST OF ALL ENDPOINTS USED WITHIN MODULE
    getEndPointList(module: string): Array<any> {
        if (this.list.hasOwnProperty(module)) {
            return Object.keys(this.list[module]);
        }
        else {
            return [];
        }
    }
}