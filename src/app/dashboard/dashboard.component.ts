import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
  Renderer,
  ViewChildren,
  QueryList,
  Input,
  Output,
  EventEmitter,
  NgZone
}
  from '@angular/core';
import { AppComponent } from '../app.component';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Payment } from '../services/data/capture.data';
import { NavigationObservableService } from '../services/data/navigation-observable.service';
import { Subscription } from 'rxjs';
import { NumberValidatorService } from '../utils/validators/number-validators.service';
import { Content, FREQUENCYLIST } from '../app.contants';
import { SpeechRecordingService } from '../services/speech-recording.service';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [NavigationObservableService]
})

export class DashboardComponent extends AppComponent implements OnInit, AfterViewInit {

  @Input() public bpForm: FormGroup;
  @Input() billersList: any;
  public billerCount: number;
  public page: string;
  public frequencyList: any;
  private subscription: Subscription;
  public maxDigitsBeforePrecision: any;
  public maxDigitsAfterPrecision: any;
  public minDigitsAfterPrecision: any;
  public precision: any;
  public separator: any;
  public allowedSeparatorCount: any;
  public currency: string;
  public content: any;
  private selectedFrequency: string;
  private speechData: string;
  private isRecordingInProgress: boolean;
  private isReadyToSave: boolean;
  private recordingSaved: boolean;
  @Output('amtStatus') public amtStatus: EventEmitter<boolean> = new EventEmitter();
  @Output('memoStatus') public memoStatus: EventEmitter<boolean> = new EventEmitter();
  @ViewChildren('errPanel', { read: ElementRef }) elemRefs: QueryList<ElementRef>;

  constructor(public _elementRef: ElementRef,
    private speechService: SpeechRecordingService,
    private _navigator: NavigationObservableService,
    private renderer: Renderer,
    private _httpService: HttpService,
    private zone: NgZone,
    public _formBuilder: FormBuilder,
    public _changeDetectorRef: ChangeDetectorRef) {
    super(_elementRef, _formBuilder, _changeDetectorRef);
    this.content = Content;
    this.frequencyList = FREQUENCYLIST;
    this.maxDigitsBeforePrecision = AppComponent.amtConfig.maxDigitsBeforePrecision;
    this.maxDigitsAfterPrecision = AppComponent.amtConfig.maxDigitsAfterPrecision;
    this.minDigitsAfterPrecision = AppComponent.amtConfig.minDigitsAfterPrecision;
    this.precision = AppComponent.amtConfig.precision;
    this.separator = AppComponent.amtConfig.separator;
    this.allowedSeparatorCount = AppComponent.amtConfig.allowedSeparatorCount;
    this.currency = "INR";
  }


  ngOnInit() {
    document.body.scrollTop = 0;
    this.stepIndicator = 1;
    this._navigator.getNavigatorTag().subscribe(
      (data: string) => {
        this.page = data;
      });

    console.warn("Page ", this.page);
    this._changeDetectorRef.detectChanges();
  }

  ngOnChanges() {
    console.warn("Biller list ", this.billersList);
    if (this.billersList) {
      for (let biller of this.billersList) {
        const isPymtPresent = this.captureData.payments.filter(item => item.payeeIndex === biller.payeeIdIndex).length !== 0;
        if (biller.payeeIndex && !isPymtPresent) {
          let pymt = this.getNewPayment(biller);
          this.addPaymentControl(pymt);
          this.captureData.payments.push(pymt);
          this.billerCount++;
        }
      }
    }
    this.removePayments();
  }

  removePayments() {
    let paymentList = this.payments.controls.slice();
    for (let index = 0; index < paymentList.length; index++) {
      if (paymentList[index]) {
        const payeeIndex = paymentList[index].value.payeeIndex;
        if (!this.isBillerPresent(payeeIndex)) {
          this.payments.removeAt(this.payments.value.findIndex((pymt: Payment) => pymt.payeeIndex === payeeIndex));
          this.captureData.payments = this.captureData.payments.filter(item => {
            return item.payeeIndex !== payeeIndex;
          })
        }
      }
    }
  }

  isBillerPresent(index: string) {
    return this.billersList.filter((item: any) => item.payeeIdIndex === index).length !== 0;
  }

  public getErrorStatus(controlError: any): boolean {
    if (controlError !== null && controlError !== undefined) {
      let errorList = Object.keys(controlError);
      return (errorList.length == 1);
    } else {
      return false;
    }
  }

  setFrequencyListValue(selectedValue: any, payment: FormArray) {
    payment.controls['isFrequencyBlank'].value = (selectedValue == 0) ? true : false;
    payment.controls['selectedFrequency'].value = selectedValue;
    for (var i = 0; i < this.frequencyList.length; i++) {
      if (this.frequencyList[i].value == selectedValue) {
        payment.controls['displaySelectedFrequency'].value = this.frequencyList[i].label;
      }
    }
    this.selectedFrequency = payment.controls['selectedFrequency'].value;
    payment.updateValueAndValidity();
    this._changeDetectorRef.detectChanges();
  }

  handlememokeyup(event: any) {
    let ele = document.getElementById("myMemo");
    let val = event.target.value;
    this.memoLeftBlank = val.length === 0 || val.trim() === '';
    this.memoStatus.emit(this.memoLeftBlank);
    if ((event.keyCode === 8 || event.keyCode === 46) && val.length === 0) {
      ele.blur();
      setTimeout(function () {
        ele.focus();
      }, 0)
    }
  }

  checkAmtBlank(event: any) {
    let val = event.target.value;
    if (val.length === 0) {
      this.amtLeftBlank = true;
      this.isamtblank = true;
    } else {
      this.amtLeftBlank = false;
      this.isamtblank = false;
    }
    this.amtStatus.emit(this.amtLeftBlank);
  }

  getNewPayment(biller: any) {
    let newPayment = new Payment();
    newPayment.selectedToAccountDetails = {
      name: biller.commonPayeeDetail.name,
      reference: biller.billPayeeDetail.customerReference
    }
    console.warn("New payment ", newPayment);
    newPayment.payeeIndex = biller.payeeIdIndex;
    newPayment.selectedDate = this.captureData.defaultSelectedDate ? this.captureData.defaultSelectedDate : {};
    return newPayment;
  }

  setpayments() {
    const paymentGroups = this.captureData.payments.map(payment => this._formBuilder.group(payment));
    const paymentFormArray = this._formBuilder.array(paymentGroups);
    this.bpForm.setControl('payments', paymentFormArray);
  }

  get payments(): FormArray {
    return this.bpForm.get('payments') as FormArray;
  }

  addPaymentControl(payment: any) {
    this.payments.push(this._formBuilder.group(payment));
  }

  updateMaxLengthValidators(ctrl: any) {
    ctrl.setValidators([Validators.required, Validators.maxLength(AppComponent.amtConfig.maxLength), NumberValidatorService.maxAmtLength(), NumberValidatorService.blankAmt(), NumberValidatorService.numberExtraDecimal(), NumberValidatorService.numberInvalidCharacters(), NumberValidatorService.numberIncorrectFormat(), NumberValidatorService.notZero()]);
    ctrl.updateValueAndValidity();
  }

  ngAfterViewInit() {
    document.body.scrollTop = 0;
    this.elemRefs.changes.subscribe(item => {
      if (!this.elemRefs.length) return;
      this.elemRefs.first.nativeElement.tabIndex = 0;
      this.renderer.invokeElementMethod(this.elemRefs.first.nativeElement, "focus");
    })
    this._changeDetectorRef.detectChanges();
  }

  isFormValid(): boolean {
    return this.bpForm.valid;
  }

  activateRecording(): void {
    console.log('Recording started......')
    this.isRecordingInProgress = true;

    this.speechService.record()
      .subscribe(
        //listener
        (value) => {
          if (!!value) {
            this.speechData += " " + value;
          }
          console.log('Response received ' + value);
        },
        //errror
        (err) => {
          console.log(err);
          if (err.error == "no-speech") {
            console.log("--restatring service--");
            this.activateRecording();
          }
        },
        //completion
        () => {
          console.log("--complete--");
          if (this.isRecordingInProgress) {
            this.activateRecording();
          }
        });
  }

  startRecording() {
    this.speechData = "";
    this.activateRecording();
    this.isReadyToSave = false;
  }

  /**
   * Stop the recording
   */
  stopRecording(): void {
    this.isRecordingInProgress = false;
    this.speechService.stopRecording();
    this.isReadyToSave = true;
  }

  submit() {

    let self = this;
    setTimeout(function () {
      self.pageOverlaySpinnerComponent.start();
      self.pageOverlaySpinnerComponent.setOverlayCopy(self.content.pageOverlayCopy);
    }, 0);

    let id = "voiceData_" + Math.floor(Math.random() * 100000);
    const wordCount = this.getWordCount(this.speechData);
    let requestData = "id="+id+ "&text=" + this.speechData + '&length=' + wordCount;
    this._httpService.executeRequest('bp.getSubmitResponse', requestData).subscribe(
      (data: any) => {
        this.zone.run(() => {
          console.warn("Data ",data);
          this.recordingSaved = true;
          this.removeLoaderPostAllResponse();
        })
      },
      (error: any) => {
        console.warn("error ", error);
        this.recordingSaved = true;
        this.removeLoaderPostAllResponse();
      }
    )
  }

  getWordCount(str) { 
    return str.split(" ").length/5;
  }

  removeLoaderPostAllResponse() {
    if (this.recordingSaved) {
      this.pageOverlaySpinnerComponent.stop();
      this.pageOverlaySpinnerComponent.setOverlayCopy('');
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    this.speechService.DestroySpeechObject();
  }

}
