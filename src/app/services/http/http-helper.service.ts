import {Injectable} from "@angular/core";
import {RequestOptions, Headers, Http} from "@angular/http";
import {HttpHeaders} from "@angular/common/http";

@Injectable()

export class HttpHelperService{
    //DEFINE HEADER VARS
    public contentToken:string = "Content-Type";
    public headers: HttpHeaders;
    constructor(){

    }

    addHeaders(endPoint:any):HttpHeaders{
        if(endPoint.headers!=null && endPoint.headers!==undefined){
            this.headers = endPoint.headers;
        }else{
            this.headers = new HttpHeaders();
        }
        this.checkAndUpdateHeaders(this.contentToken, 'application/json');
        return this.headers;
    }

    checkAndUpdateHeaders(property: any, value: string): void{
        if(this.headers.has(property)){
            return;
        }else{
            this.headers = this.headers.set(property,value);
        }
    }
}