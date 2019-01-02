import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class NavigationObservableService {

    private dataSelected$: BehaviorSubject<any>;

    constructor(){
        this.dataSelected$ = <BehaviorSubject<string>>new BehaviorSubject({});
    }

    getNavigatorTag():Observable<string>{
        return this.dataSelected$.asObservable();
    }

    setNavigatorTag(selectedObj: string):void{
        this.dataSelected$.next(selectedObj);
    }
    
}