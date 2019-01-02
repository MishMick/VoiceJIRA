import { Component, ElementRef, ChangeDetectorRef, ViewChildren, NgZone, QueryList, Renderer } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormBuilder } from '@angular/forms';
import { FormObservableService } from '../services/data/form-observable.service';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  providers: []
})

export class ContainerComponent extends AppComponent {
  public payeeList: any;
  public billerList: any;
  @ViewChildren('errPanel', { read: ElementRef }) elemRefs: QueryList<ElementRef>;
  constructor(public _elementRef: ElementRef,
    public _formBuilder: FormBuilder,
    private zone: NgZone,
    public _changeDetectorRef: ChangeDetectorRef,
    private _httpService: HttpService,
    private _renderer: Renderer) {
    super(_elementRef, _formBuilder, _changeDetectorRef);
    this.bpForm = FormObservableService.getForm(_formBuilder);
  }

  ngOnInit() {
    this.loadPageData();
  }

  ngAfterViewInit() {
    this.elemRefs.changes.subscribe(item => {
      if (!this.elemRefs.length) return;
      this.elemRefs.first.nativeElement.tabIndex = 0;
      this._renderer.invokeElementMethod(this.elemRefs.first.nativeElement, 'focus');
    })
    this._changeDetectorRef.detectChanges();
  }

  loadPageData() {
    this.billerRetrieved = false;
    document.body.scrollTop = 0;

    //LOADER
    /*
    let self = this;
    setTimeout(function () {
      self.pageOverlaySpinnerComponent.start();
      self.pageOverlaySpinnerComponent.setOverlayCopy(self.content.pageOverlayCopy);
    }, 0);
    */
    //EXECUTE BILLER SERVICE
    this._httpService.executeRequest('bp.getBillerList', "").subscribe(
      (data: any) => {
        this.zone.run(() => {
          this.billerRetrieved = true;
          this.payeeList = data.payeeList;
          this.filerBillerList(this.payeeList)
          this.removeLoaderPostAllResponse();
        })
      },
      (error: any) => {
        this.billerRetrieved = true;
        this.removeLoaderPostAllResponse();
      }
    )
  }

  filerBillerList(data: any) {
    let payeeIdIndexes: any;

    if (window.sessionStorage) {
      //payeeIdIndexes = sessionStorage.getItem(Constants.PAYEE_INDEXES_STORAGE_KEY);
    }
    payeeIdIndexes = "xYz";
    if (payeeIdIndexes) {
      let indexes: Array<string> = payeeIdIndexes.split(' ');
      let filteredPayees: Array<any> = [];
      for (let index of indexes) {
        for (let payee of data) {
          if (index === payee.payeeIdIndex) {
            filteredPayees.push(payee);
            payee.payeeIndex = true;
            break;
          }
        }
      }
      if (filteredPayees && filteredPayees.length > 0) {
        this.billerList = filteredPayees;
      } else {
        this.billerRetrieved = true;
        this.removeLoaderPostAllResponse();
      }
    } else {
      this.billerRetrieved = true;
      this.removeLoaderPostAllResponse();
    }
  }

  ngOnChanges() {

  }

  removeLoaderPostAllResponse() {
    if (this.billerRetrieved) {
      this.pageOverlaySpinnerComponent.stop();
      this.pageOverlaySpinnerComponent.setOverlayCopy('');
    }
  }
}
