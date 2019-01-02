import { Component, ElementRef, ChangeDetectorRef, Input } from '@angular/core';
import { Content } from '../../app.contants';

declare var require: any;

@Component({
    selector: 'page-overlay-spinner',
    templateUrl: './page-overlay-spinner.component.html',
    styleUrls: ['./page-overlay-spinner.component.css'],
    providers: []
})

export class PageOverlaySpinnerComponent {

    @Input() content: any;

    constructor(public _elementRef: ElementRef, public _changeDetectorRef: ChangeDetectorRef) {
            this.content = Content;
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {

        this.hideBodyAfterSpinnerLoad('page-overlay-spinner');
        this._changeDetectorRef.detectChanges();

        this.stop();
    }

    /**
     * This method is used to enable the overlay spinner during any action in progress.
     */
    public start(): void {
        const spinner = document.getElementById('main-overlay-spinner'),
            mainContent = document.getElementById('mainContentWrapper'),
            body = document.body;

        // tslint:disable-next-line:no-unused-expression
        mainContent && mainContent.classList.add('blur-container');

        if (spinner != null) {
            spinner.style.display = 'block';
        }
        if (spinner != null) {
            body.style.overflow = 'hidden';
        }

        this.focusSpinner(true);
    }


    /**
     * This method is used to disable the overlay spinner after any action is completed.
     */
    public stop(): void {
        const spinner = document.getElementById('main-overlay-spinner'),
            mainContent = document.getElementById('mainContentWrapper'),
            body = document.body;

        if (mainContent && mainContent.classList.contains('blur-container')) {
            mainContent.classList.remove('blur-container');
        }

        if (spinner != null) {
            spinner.style.display = 'none';
        }
        if (spinner != null) {
            body.style.overflow = '';
        }

        this.focusSpinner(false);
    }

    public focusSpinner(flag:boolean): void{
        let loadingSpinner: any = document.getElementById('main-overlay-spinner');
        if(flag){
            if(loadingSpinner){
                loadingSpinner.setAttribute('tabindex','0');
                loadingSpinner.focus();
            }
            else{
                if(loadingSpinner){
                    loadingSpinner.setAttribute('tabindex','-1');
                    loadingSpinner.blur();
                }
            }
        }
    }

    public setOverlayCopy(copy: string): void {
        const spinnerCopy = document.getElementById('main-overlay-text');
        if (spinnerCopy != null) {
            spinnerCopy.innerHTML = copy;
        }
    }


    hideBodyAfterSpinnerLoad(modalId: any) {
        const cancelPopElement = document.getElementById(modalId);
        if (cancelPopElement && cancelPopElement.parentElement) {
            if (document.body) {
                cancelPopElement.parentElement.removeChild(cancelPopElement);
                const modalElement = document.getElementById(modalId);
                if (modalElement && modalElement.parentElement) {
                    modalElement.parentElement.removeChild(modalElement)
                }
                document.body.appendChild(cancelPopElement);
            }
        }
    }

    public spinnerClicked(event:any){
        event.preventDefault();
        event.stopPropagation();
        setTimeout(function() {
            document.getElementById('main-overlay-spinner').focus();
        },0);
    }

}
