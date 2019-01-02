import {Injectable} from '@angular/core';
import {ValidatorFn, AbstractControl} from '@angular/forms';
import {AppComponent} from '../../app.component';

@Injectable()
export class NumberValidatorService{
    static precPos:any;
    static separatorRe: RegExp;
    static amtErrors:any = {};
    static amtMaxLength: any;

    constructor(){
    
    }

    static blankAmt():ValidatorFn{
        return (control: AbstractControl): {[key: string]: any} => {
            const input = control.value;
            if(input.length === 0){
                return {'blankAmt': {value: input}};
            }else{
                return null;
            }
        };
    }

    static maxAmtLength():ValidatorFn{
        this.amtMaxLength = AppComponent.amtConfig.maxDigitsBeforePrecision + AppComponent.amtConfig.maxDigitsAfterPrecision + AppComponent.amtConfig.allowedSeparatorCount + 1;
        this.precPos = AppComponent.amtConfig.maxDigitsBeforePrecision + AppComponent.amtConfig.allowedSeparatorCount + 1;
        return (control: AbstractControl): {[key: string]: any} => {
            let input = control.value;
            this.separatorRe = new RegExp(AppComponent.amtConfig.separator,"gi");
            let actualPrecisionPos = input.indexOf(AppComponent.amtConfig.precision),
                actualCharsBeforePrecision,
                actualSeparatorsBeforePrecision,
                actualCharsWithoutSeparatorBeforePrecision;
            
            if(input.length > this.amtMaxLength){
                return {'maxlength': {value: input}};
            }else if(actualPrecisionPos !== -1){
                actualPrecisionPos = actualPrecisionPos + 1;
                let valueStringBeforePrecision = input.substring(0, actualPrecisionPos - 1);
                actualCharsBeforePrecision = valueStringBeforePrecision.length;
                actualSeparatorsBeforePrecision = (valueStringBeforePrecision.match(this.separatorRe) || []).length;
                actualCharsWithoutSeparatorBeforePrecision = actualCharsBeforePrecision - actualSeparatorsBeforePrecision;
                if(actualCharsWithoutSeparatorBeforePrecision > AppComponent.amtConfig.maxDigitsBeforePrecision){
                    return {'maxlength': {value:input}};
                }
            }else if(actualPrecisionPos == -1){
                let actualLength = input.length;
                actualCharsBeforePrecision = actualLength;
                actualSeparatorsBeforePrecision = (input.match(this.separatorRe) || []).length;
                actualCharsWithoutSeparatorBeforePrecision = actualCharsBeforePrecision - actualSeparatorsBeforePrecision;
                if(actualCharsWithoutSeparatorBeforePrecision > AppComponent.amtConfig.maxDigitsBeforePrecision){
                    return {'maxlength': {value:input}}
                }
            }else{
                return null;
            }
        }
    }

    static notZero():ValidatorFn {
        return (control: AbstractControl): {[key: string] : any} => {
            const input = control.value;
            const parsedValue = isNaN(input) ? Number(input.replace(/\,/g, '')) : parseFloat(input);
            if(parsedValue < 0 || parsedValue == 0){
                return {'negativeAmt':{value:input}};
            }else{
                return null;
            }
        }
    }

    static numberExtraDecimal():ValidatorFn{
        return (control: AbstractControl): {[key: string]: any} => {
            const input = control.value;
            if(new RegExp(/^.*[\.].*[\.].*$/).test(input) && input!== null){
                return {'invalidAmt': {value:input}};
            }else{
                return null;
            }
        }
    }

    static numberIncorrectFormat(): ValidatorFn{
        return (control: AbstractControl): {[key: string]:any} => {
            const input = control.value.replace(/\,/g,'');
            if((!new RegExp("^[^"+AppComponent.amtConfig.separator+"][^"+AppComponent.amtConfig.precision+"]*"+"(["+AppComponent.amtConfig.precision+"][^"+AppComponent.amtConfig.precision+"^"+AppComponent.amtConfig.separator+"]{"+AppComponent.amtConfig.minDigitsAfterPrecision+","+AppComponent.amtConfig.maxDigitsAfterPrecision+"})?$").test(input) && input.length!==0) || input === '.'){
                return {'invalidAmt': {value:input}};
            }else{
                return null;
            }
        }
    }

    static numberInvalidCharacters(): ValidatorFn{
        return (control: AbstractControl): {[key: string]: any} => {
            const input = control.value;
            if(new RegExp("^(["+AppComponent.amtConfig.precision + AppComponent.amtConfig.separator + "0-9]*["+ AppComponent.amtConfig.precision + "0-9]*|)$").test(input) && input!==null){
                return null;
            }else{
                return {"invalidChar":{value: input}};
            }
        }
    }
}