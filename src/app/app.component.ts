import {ElementRef, ChangeDetectorRef, Component} from '@angular/core';
import {PageOverlaySpinnerComponent} from './utils/page-overlay-spinner/page-overlay-spinner.component';
import {Content} from './app.contants';
import {FormBuilder,FormGroup} from "@angular/forms";
import {FormObservableService} from '../app/services/data/form-observable.service';
import {CaptureDataObservableService} from '../app/services/data/capture-data-observable.service';
@Component({
    selector: 'app-component',
    templateUrl: './app.component.html',
    providers: [],
    styleUrls: []
})
export class AppComponent{

    private static content:any;
    public pageOverlaySpinnerComponent:PageOverlaySpinnerComponent;
    public stepIndicator: any;
    public captureData = CaptureDataObservableService.getCaptureData();
    public bpForm: FormGroup;
    public billerRetrieved: boolean = false;
    public amtLeftBlank: boolean = true;
    public isamtblank : boolean = true;
    public memoLeftBlank: boolean = true;
    public static amtConfig: any = {
        maxlength: 17,
        precision: '.',
        separator: ',',
        maxDigitsBeforePrecision: 11,
        maxDigitsAfterPrecision: 2,
        minDigitsAfterPrecision: 0,
        allowedSeparatorCount: 3
    }

    constructor(public _elementRef:ElementRef, 
                public _formBuilder:FormBuilder,
                public _changeDetectorRef:ChangeDetectorRef)
    {
        this.pageOverlaySpinnerComponent = new PageOverlaySpinnerComponent(_elementRef, _changeDetectorRef);
        this.bpForm = FormObservableService.getForm(_formBuilder);
        this.getContent(Content);
    }

    get content():any{
        return AppComponent.content;
    }

    set content(data:any){
        AppComponent.content = data;
    }

    getContent(content:any){
        this.content = Content;
    }


}