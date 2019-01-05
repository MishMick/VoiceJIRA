declare var process: any;
declare var require: any;

import { Injectable } from '@angular/core';
import { Request, Response, RequestOptions,RequestOptionsArgs, RequestMethod } from '@angular/http';
import { RequestArgs } from '@angular/http/src/interfaces';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
//import 'rxjs/add/operator/throw';

import { HttpHelperService } from './http-helper.service';
import { EndPointService } from './endpoint.service';
import { catchError } from "rxjs/operators";

@Injectable()

export class HttpService {
     private appendToURI : string = "";
     constructor(private _http: HttpClient,
         private endPointService: EndPointService,
         private _httpHelper: HttpHelperService) {

     }

     executeRequest(endPointName: string, data: any): Observable<any> {
         let endPoint = this.endPointService.getEndPoint(endPointName);
         let options: any;
         let envConfig: any = process.env.envConfig;
         if (endPoint.appendToURI === true) {
             let initialHeaders = this._httpHelper.addHeaders(endPoint);
             options = {
                 method: endPoint.method,
                 url: endPoint.url + data,
                 headers: initialHeaders,
                 body: this.isNullOrUndefined(data) ? null : data
             };
         } else {
            let initialHeaders = this._httpHelper.addHeaders(endPoint);
            options = {
                 method: endPoint.method,
                 url: endPoint.url,
                 headers: initialHeaders,
                 body: this.isNullOrUndefined(data) ? null : data
             };
         }
         console.warn("Request ",this.request(options));
         return this.request(options);
     }

     isNullOrUndefined(property:any):boolean{
         let isNullOrUndefined:boolean = false;
         if(property === null || property === undefined){
             isNullOrUndefined = true;
         }
         return isNullOrUndefined;
     }

     request(args: any): Observable<any> {
         switch(args.method.toUpperCase()){
             case 'GET':
             return this._http.get(args.url,{
                 headers: args.headers,
                 responseType: args.responseType,
                 observe: 'body'
             }).pipe(
                 catchError(this.handleError)
             );
             case 'POST':
             return this._http.post(args.url,{
                headers: args.headers,
                responseType: args.responseType,
                observe: 'body'
             }).pipe(
                catchError(this.handleError)
             );
             case 'PUT':
             return this._http.put(args.url,{
                headers: args.headers,
                responseType: args.responseType,
                observe: 'body'
             }).pipe(
                catchError(this.handleError)
             );
             case 'DELETE':
             return this._http.delete(args.url,{
                headers: args.headers,
                responseType: args.responseType,
                observe: 'body'
             }).pipe(
                catchError(this.handleError)
             );
         }
     }

     private handleError(error: any) {
         let rejectionStatus = error.status;
         if(typeof error.error === 'string'){
             error = {};
         }else{
             error = error.error;
         }

         let isEmptyObject: boolean = true;
         let name;
         for(name in error){
             isEmptyObject = false;
         }

         // add info in errorInfo
         if(isEmptyObject){
             let errorInfo:any = {};
             let errorObject:any = {};
             errorObject.code = rejectionStatus;
             errorInfo.push(errorObject);
             error.errorInfo = errorInfo;
         }
         return Observable.throw(error);
     }

}
