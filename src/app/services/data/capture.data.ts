export class CaptureData{
    public selectedFromAccount:any;
    public selectedFromAccountDetails:any;
    public serverDate:any;
    public minDate:any;
    public maxDate:any;
    public recurringMaxDate:any;
    public payments: Payment[] = [];
    public defaultSelectedDate:any;
    public confirmResponse:any;
    public confirmWarningResponse:any;
    public confirmErrorResponse:any;
    public isCredit:boolean;
    public billersList:any;
}

export class Payment{
    public selectedToAccount:any;
    public payeeIndex:any;
    public selectedToAccountDetails:any;
    public amount:string;
    public memo:any;
    public selectedReason:any;
    public selectedDate:any;
    public displaySelectedDate:any;
    public displaySelectedReason:any;
    public isNow:boolean;
    public amountCurrency:any;
    public isMemoBlank:boolean;
    public referenceNumber:any;
    public revisedDate:any;
    public separator:any;
    public selectedFrequency:any;
    public noOfTransfer:any;
    public isRecurring:boolean;
    public displaySelectedFrequency:any;
    public isNri:boolean;
    public showReasonCheckBox:boolean;
    public isDateChanged:boolean;
    public noOfTransferErrors:any;
    public isFrequencyBlank:boolean;
    public noOTransferLeftBlank:boolean;
    public showCurrentDateError:boolean;
    
    constructor(){
        this.amount = "";
        this.amountCurrency = "";
        this.isRecurring = false;
        this.isDateChanged = false;
        this.memo = "";
        this.selectedFrequency = "";
        this.noOfTransfer = "";
        this.displaySelectedFrequency = "";
        this.noOfTransferErrors = [];
        this.isFrequencyBlank = false;
        this.noOTransferLeftBlank = false;
        this.showCurrentDateError = false;
    }
}