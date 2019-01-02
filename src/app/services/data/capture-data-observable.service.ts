import { Injectable } from '@angular/core';
import { CaptureData } from "../data/capture.data";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class CaptureDataObservableService {
    private dataSelected: BehaviorSubject<any>;
    private static captureData: any = null;

    static getCaptureData(){
        if(this.captureData == null){
            this.captureData = new CaptureData();
        }
        return this.captureData;
    }

    constructor(){
        this.dataSelected = <BehaviorSubject<any>>new BehaviorSubject({});
    }

    getDynamicData():Observable<any>{
        return this.dataSelected.asObservable();
    }

    setDynamicData(selectedObj: Object):void{
        this.dataSelected.next(selectedObj);
    }
}