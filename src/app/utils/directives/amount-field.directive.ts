import { Directive, ElementRef, HostListener, Input, Host } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AppComponent } from '../../app.component';
import  { DecimalValues }  from '../amount-format/decimal-format';
import  { AmountFormatFilter }  from '../amount-format/amount.format.filter';

@Directive({
    selector: '[amount-field]',
})

export class AmountFieldDirective {
    @Input() maxDigitsBeforePrecision: number;
    @Input() maxDigitsAfterPrecision: number;
    @Input() minDigitsAfterPrecision: number;
    @Input() precision: string;
    @Input() separator: string;
    @Input() allowedSeparatorCount?: number;
    @Input() amtMaxLength?: number;
    @Input() currency: any;
    public separatorRe: RegExp;
    public prevValue: string;
    public beforeDecimal: string;
    public afterDecimal:string;
    public maxLength: any;
    public cursor: number = 0;
    public precPos:any;
    public regExp: RegExp = new RegExp("^[^"+ AppComponent.amtConfig.separator + "][^" + AppComponent.amtConfig.precision + "]*" + "([" + AppComponent.amtConfig.precision + "][^" + AppComponent.amtConfig.precision + "^" + AppComponent.amtConfig.separator + "]{" + AppComponent.amtConfig.minDigitsAfterPrecision+","+AppComponent.amtConfig.maxDigitsAfterPrecision+"})?$");
    public formatBalance: AmountFormatFilter;
    
    constructor(
        private el:ElementRef,
        private control: NgControl){
            this.formatBalance = new AmountFormatFilter();
    }

    ngOnInit(){
        this.beforeDecimal = ((AppComponent.amtConfig.maxDigitsBeforePrecision)+1).toString();
        this.afterDecimal = DecimalValues[this.currency];
        this.maxLength = this.beforeDecimal;
        this.el.nativeElement.setAttribute('maxlength', this.maxLength);
    }

    @HostListener('focus') onFocus(){
        this.cursor = this.el.nativeElement.selectionStart;
        this.el.nativeElement.isActive = true;
        let amountValue = this.el.nativeElement.value;
        if(this.control.valid){
            amountValue = amountValue.replace(/\,/g, '');
        }
        this.el.nativeElement.value = amountValue;
        this.setMaxLength(amountValue);
        this.el.nativeElement.setAttribute('maxlength', this.maxLength);
        this.control.control.setValue(amountValue);
    }

    @HostListener('blur') onBlur(){
        this.separatorRe = new RegExp(AppComponent.amtConfig.separator, "gi");
        this.el.nativeElement.isActive = false;
        let charPosition = this.el.nativeElement.selectionStart;
        this.precPos = AppComponent.amtConfig.maxDigitsBeforePrecision + AppComponent.amtConfig.allowedSeparatorCount + 1;

        let amountValue = this.el.nativeElement.value;
        let actualLength = amountValue.length,
            actualPrecisionPos = amountValue.indexOf(AppComponent.amtConfig.precision),
            actualCharsBeforePrecision,
            actualSeparatorsBeforePrecision,
            actualCharsWithoutSeparatorsBeforePrecision;
            actualCharsBeforePrecision = actualLength;
            actualSeparatorsBeforePrecision = (amountValue.match(this.separatorRe) || []).length;
            actualCharsWithoutSeparatorsBeforePrecision = actualCharsBeforePrecision - actualSeparatorsBeforePrecision;

            amountValue = amountValue.replace(/\,/g,'');

            if(this.control.valid){
                if(actualPrecisionPos === -1){
                    if(amountValue.length !== 0 && actualCharsWithoutSeparatorsBeforePrecision <= this.maxDigitsBeforePrecision && !isNaN(amountValue)){
                        this.maxLength = actualLength;
                        this.el.nativeElement.setAttribute('maxlength', this.maxLength);
                        amountValue = this.convertToNumber(amountValue);
                        amountValue = this.formatBalance.transform(amountValue, this.currency);
                    }else{
                        this.maxLength = this.precPos;
                        this.el.nativeElement.setAttribute('maxlength', this.maxLength);
                    }
                }
                else{
                    actualPrecisionPos = actualPrecisionPos + 1;
                    let valueStringBeforePrecision = amountValue.substring(0, actualPrecisionPos - 1);
                    actualCharsBeforePrecision = valueStringBeforePrecision.length;
                    actualSeparatorsBeforePrecision = (valueStringBeforePrecision.match(this.separatorRe)||[]).length;
                    actualCharsWithoutSeparatorsBeforePrecision = actualCharsBeforePrecision - actualSeparatorsBeforePrecision;
                    if(charPosition <= actualPrecisionPos){
                        if(actualCharsWithoutSeparatorsBeforePrecision <= this.maxDigitsBeforePrecision){
                            this.maxLength = actualLength;
                            this.el.nativeElement.setAttribute('maxLength', this.maxLength);
                            amountValue = this.convertToNumber(amountValue);
                            amountValue = this.formatBalance.transform(amountValue, this.currency);
                        }
                    }else{
                        this.maxLength = actualPrecisionPos + AppComponent.amtConfig.maxDigitsAfterPrecision;
                        this.el.nativeElement.setAttribute('maxlength', this.maxLength);
                        amountValue = this.convertToNumber(amountValue);
                        amountValue = this.formatBalance.transform(amountValue, this.currency);
                    }
                }
                this.el.nativeElement.value = amountValue;
                this.setMaxLength(amountValue);
                this.el.nativeElement.setAttribute('maxlength', this.maxLength);
                this.control.control.setValue(amountValue);
            }
    }

    @HostListener('keyup') onkeyup(){
        this.cursor = this.el.nativeElement.selectionStart;
        let textFieldValue : any = this.el.nativeElement.value;
        this.setMaxLength(textFieldValue);
        this.el.nativeElement.setAttribute('maxlength', this.maxLength);
    }

    @HostListener('keydown', ['$event']) onkeydown(event: KeyboardEvent){
        this.cursor = this.el.nativeElement.selectionStart;
        let textFieldValue : any = this.el.nativeElement.value;
        if(textFieldValue.indexOf(AppComponent.amtConfig.precision) === -1){
            this.setMaxLength(textFieldValue);
        }
        else{
            let dPosition = textFieldValue.indexOf(AppComponent.amtConfig.precision);
            this.maxLength = dPosition + AppComponent.amtConfig.maxDigitsAfterPrecision + 1;
        }
        this.el.nativeElement.setAttribute('maxlength', this.maxLength);
    }

    @HostListener('input',['$event']) oninput($event: Event){
        if(this.el.nativeElement.value && this.maxLength >= this.el.nativeElement.value.length){
            this.prevValue = this.el.nativeElement.value;
        }
        if(this.el.nativeElement.value && this.maxLength < this.el.nativeElement.value.length){
            if(this.el.nativeElement.value.length > this.prevValue.length){
                this.el.nativeElement.value = this.prevValue;
            }
        }
    }

    convertToNumber(amtStr: any){
        if(amtStr.trim() !== ""){
            amtStr = amtStr.replace(/\,/g, '');
            let separatorRe = new RegExp('['+AppComponent.amtConfig.separator+']','gi');
            let precisionRe = new RegExp('['+AppComponent.amtConfig.precision+']','gi');
            //Convert to decimal number before passing to filter
            amtStr = amtStr.replace(separatorRe,'');
            amtStr = amtStr.replace(precisionRe,'');
            if(amtStr!=""){
                return Number(amtStr);
            }else{
                return '';
            }
        }
    }

    public setMaxLength(value:any): void{
        let bDecimal = Number(this.beforeDecimal);
        let aDecimal = Number(DecimalValues[this.currency]);
        this.cursor = this.el.nativeElement.selectionStart;
        if(value.indexOf(AppComponent.amtConfig.precision) === -1){
            this.maxLength = Math.max( bDecimal, bDecimal + (value.match(new RegExp(AppComponent.amtConfig.separator,"g"))||[]).length);
        }else{
            let dPosition = value.indexOf(AppComponent.amtConfig.precision);
            if(this.cursor <= dPosition){
                this.maxLength = Math.max(bDecimal+aDecimal+1, bDecimal+aDecimal+1+(value.match(new RegExp(AppComponent.amtConfig.separator,"g"))||[]).length);
            }else{
                this.maxLength = dPosition + 3;
            }
        }
    }
}