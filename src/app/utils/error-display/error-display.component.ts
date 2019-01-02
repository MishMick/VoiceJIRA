import {Component, Input} from '@angular/core';
import { AnimationMetadataType } from '@angular/animations';

@Component({
    selector: 'error-display',
    templateUrl: './error-display.component.html',
    styleUrls: ['./error-display.component.css']
})

export class ErrorDisplayComponent{
    @Input('response')
    public response: any;
    @Input('errorContent')
    public errorContent: any;
    @Input('isWarning')
    public isWarning: any;
    @Input('isBackEndError')
    public isBackEndError: any;
    @Input('isError')
    public isError: any;
    @Input('isSuccess')
    public isSuccess: any;
    @Input('successCopy')
    public successCopy: any;
    @Input('warningCopy')
    public warningCopy: any;
    @Input('isAllMultipleFail')
    public isAllMultipleFail: any;
    @Input('ErrorCopy')
    public errorCopy: any;
    @Input('isSingleError')
    public isSingleError: any;
    @Input('singleErrorCopy')
    public singleErrorCopy: any;
    @Input('isSingleErrorInline')
    public isSingleErrorInline: any;
    @Input('singleErrorInlineCopy')
    public singleErrorInlineCopy: any;

    @Input('isSingleSuccess')
    public isSingleSuccess: any;
    @Input('singleSuccessCopy')
    public singleSuccessCopy: any;

    @Input('isSingleWarning')
    public isSingleWarning: any;
    @Input('singleWarningCopy')
    public singleWarningCopy: any;
    @Input('labelId')
    public labelId?: string;
    
    public errorResponse: any;
    public errorCode: any;
    public errorMessage: any;

    @Input() public singleErrorCode:string = '';

    constructor(){
        this.isBackEndError = false;
        this.isError = false;
        this.isWarning = false;
    }

    ngOnInit(){
        this.errorResponse = this.response;
        if(this.singleErrorCode){
            this.errorCode = this.singleErrorCode;
            this.errorMessage = this.errorContent.errorMsg  + this.singleErrorCode + ".";
        }else if(this.errorResponse && this.errorResponse.responseInfo){

        }else if(this.errorResponse && this.errorResponse.errorInfo){

        }else{
            this.errorCode = "P0";
        }
    }

    isEmptyObject(object:any): boolean{
        for (let name in object){
            return false;
        }
        return true;
    }
}