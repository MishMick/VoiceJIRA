import { Pipe, PipeTransform } from '@angular/core';
import {Injectable} from '@angular/core';
import {DecimalValues} from './decimal-format';

@Pipe({ name: "amountFormat" })
@Injectable()
export class AmountFormatFilter implements PipeTransform{
    constructor(){

    }

    transform(value:any, currency:any): Object{
        let locale : any = "en-UK";
        if(value!==null && (currency && currency!=="")){
        try{
            value = value.toLocaleString(locale, {minimumFractionDigits: DecimalValues[currency], maximumFractionDigits: DecimalValues[currency]});
        }catch(e){
            value = value.toLocaleString(locale, {minimumFractionDigits: DecimalValues[currency], maximumFractionDigits: DecimalValues[currency]});
        }
        return value + "";
    }else{
        return null;
    }
    }
}