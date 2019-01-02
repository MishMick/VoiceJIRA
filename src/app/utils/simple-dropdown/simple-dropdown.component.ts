import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, AfterViewInit, Input, ViewChild, ElementRef, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { HttpInterceptingHandler } from '@angular/common/http/src/module';

@Component({
    selector: 'simple-dropdown',
    templateUrl: './simple-dropdown.component.html',
    styleUrls: ['./simple-dropdown.component.css'],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SimpleDropdownComponent), multi: true }]
})

export class SimpleDropdownComponent implements AfterViewInit, ControlValueAccessor {
    public isOpen: boolean = false;
    public clickEvent: string = "click";
    public ENTER: number = 13;
    public ESCAPE: number = 27;
    public SPACE: number = 32;
    public UP: number = 38;
    public DOWN: number = 40;
    public TAB: number = 9;
    public selectedText: string = "";
    @Input() defaultSelected: string;
    // Attach point of child component 'target' to access child component attributes
    @ViewChild('target') target: ElementRef;
    // Attach point of child component 'drop' to access child component attributes
    @ViewChild('drop') drop: ElementRef;
    @Input() itemList: any;
    @Output('selectedValue')
    public selectedValue: EventEmitter<any> = new EventEmitter();

    constructor(private _changeDetectorRef: ChangeDetectorRef) {
        this.clickEvent = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';
    }

    propagateChange = (_: any) => {

    }
    ngAfterViewInit() {
        document.addEventListener("click", this.documentClick.bind(this));
        this.target.nativeElement.addEventListener("keydown", this.targetKeyDown.bind(this));
        this.target.nativeElement.addEventListener("click", this.targetClick.bind(this));
        this.drop.nativeElement.addEventListener("keydown", this.dropKeyDown.bind(this));
        this.drop.nativeElement.addEventListener("click", this.dropClick.bind(this));
        this.defaultSelection(true);
    }

    documentClick(e: any) {
        e.stopPropagation();
        if (e.screenX > 0 && e.screenY > 0 || e instanceof MouseEvent) {
            if (!this.isOpen) return;
            if (this.drop.nativeElement.contains(e.target) || this.drop === e.target) return;
            if (this.drop.nativeElement.contains(e.target) || this.target === e.target) return;
            this.isOpen = false;
        }
    }

    defaultSelection(componentLoading: boolean) {
        let selected = this.drop.nativeElement.querySelector(".select-option-selected");
        if (!selected) {
            this.pickOption(this.drop.nativeElement.querySelector(".select-option"), componentLoading);
        } else {
            this.pickOption(selected, componentLoading);
        }
    }

    moveToSelectedOption() {
        let selected = this.drop.nativeElement.querySelector('.select-option-selected');
        if (selected) {
            selected.focus();
        }
    }
    //This function invokes keydown event on select dropdown
    targetKeyDown(e: any) {
        if ([this.UP, this.DOWN, this.ESCAPE, this.ENTER, this.SPACE].indexOf(e.keyCode) >= 0) {
            e.preventDefault();
        }
        if (this.isOpen) {
            switch (e.keyCode) {
                case this.UP:
                case this.DOWN:
                    this.moveToSelectedOption();
                    break;
                case this.ENTER:
                case this.ESCAPE:
                case this.SPACE:
                case this.TAB:
                    let options = this.drop.nativeElement.querySelectorAll(".select-option");
                    options[0].focus();
                    this.isOpen = false;
                    break;
            }
        } else {
            if ([this.UP, this.DOWN, this.ESCAPE, this.ENTER, this.SPACE].indexOf(e.keyCode) >= 0) {
                this.isOpen = true;
                this.moveToSelectedOption();
            }
        }
    }

    targetClick(e: any) {
        e.stopPropagation();
        if (e.screenX > 0 && e.screenY > 0 || e instanceof MouseEvent) {
            this.isOpen = !this.isOpen;
            this._changeDetectorRef.detectChanges();
            if (this.isOpen) {
                this.moveToSelectedOption();
            } else {
                this.target.nativeElement.focus();
            }
        }
    }

    dropKeyDown(e: any) {
        if ([this.UP, this.DOWN, this.ESCAPE, this.SPACE, this.ENTER].indexOf(e.keyCode) >= 0) {
            e.preventDefault();
        }

        if (this.hasClass(e.target, 'select-option')) {
            if (this.isOpen) {
                switch (e.keyCode) {
                    case this.UP:
                    case this.DOWN:
                        this.moveSelection(e);
                        break;
                    case this.ENTER:
                    case this.SPACE:
                        this.pickOption(e.target, false);
                        break;
                    case this.ESCAPE:
                    case this.TAB:
                        let options = this.drop.nativeElement.querySelectorAll('.select-option');
                        options[0].focus();
                        this.clearOptionHighlight();
                        this.target.nativeElement.focus();
                        break;
                }
            }
        }
    }

    dropClick(e: any) {
        e.stopPropagation();
        if (this.hasClass(e.target, 'select-option')) {
            this.pickOption(e.target, false);
        }
    }

    pickOption(element: HTMLElement, componentLoading: boolean) {
        this.clearSelection();
        this.clearOptionHighlight();
        if (element) {
            let selectedValue = element.getAttribute("data-value");
            this.selectedText = element.getAttribute("data-text");
            this.addClass(element, "select-option-selected");
            this.propagateChange(selectedValue);
            this.selectedValue.emit(selectedValue);
        } else {

        }
        this.isOpen = false;
        if (!componentLoading) {
            this.target.nativeElement.focus();
            this._changeDetectorRef.detectChanges();
        }
    }

    moveSelection(e: any) {
        let selected = this.drop.nativeElement.querySelector(".select-option-selected");
        let highlighted = this.drop.nativeElement.querySelector(".select-option-highlight");
        let options = this.drop.nativeElement.querySelectorAll(".select-option");
        if (highlighted) {
            let highlightedIndex = Array.prototype.indexOf.call(options, highlighted);
            if (e.keyCode == this.UP) {
                highlightedIndex--;
            } else {
                highlightedIndex++;
            }
            if (highlightedIndex < 0) highlightedIndex = 0;
            if (highlightedIndex >= options.length) highlightedIndex = options.length - 1;
            this.highlightOption(options[highlightedIndex]);
        } else {
            let selectedIndex = Array.prototype.indexOf.call(options, selected);
            if (e.keyCode == this.UP) {
                selectedIndex--;
            } else {
                selectedIndex++;
            }
            if (selectedIndex < 0) selectedIndex = 0;
            if (selectedIndex >= options.length) selectedIndex = options.length - 1;
            this.highlightOption(options[selectedIndex]);
        }
    }

    clearSelection() {
        let selected = this.drop.nativeElement.querySelector(".select-option-selected");
        if (selected) {
            this.removeClass(selected, "select-option-selected");
        }
    }

    clearOptionHighlight() {
        let highlighted = this.drop.nativeElement.querySelector(".select-option-highlight");
        if (highlighted) {
            this.removeClass(highlighted, "select-option-highlight");
        }
    }

    highlightOption(option: any) {
        var highlighted = this.drop.nativeElement.querySelector('.select-options-highlight');
        if (highlighted) {
            this.removeClass(highlighted, 'select-option-highlight');
        }
        this.addClass(option, 'select-option-highlight');
        option.focus();
    }

    hasClass(el: HTMLElement, name: string) {
        if (typeof el.classList !== 'undefined') {
            return el.classList.contains(name);
        }
        var classname = this.getClassName(el);
        return new RegExp('(^| )' + name + '( |$)', 'gi').test(classname);
    }

    getClassName(el: any) {
        if (el.className instanceof SVGAnimatedString) {
            return "";
        }
        return el.className;
    }

    addClass(el: any, name: any) {
        if (typeof el.classList !== 'undefined') {
            name.split(' ').forEach(function (cls: any) {
                if (cls.trim()) {
                    el.classList.add(cls);
                }
            });
        } else {
            this.removeClass(el, name);
            var cls = this.getClassName(el) + (' ' + name);
            this.setClassName(el, cls);
        }
    }

    removeClass(el: any, name: any) {
        if (typeof el.classList !== 'undefined') {
            name.split(' ').forEach(function (cls: any) {
                if (cls.trim()) {
                    el.classList.remove(cls);
                }
            })
        } else {
            var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
            var className = this.getClassName(el).replace(regex, ' ');
            this.setClassName(el, className);
        }
    }

    setClassName(el: any, className: any) {
        el.setAttribute('class', className);
    }



    writeValue(value: any) {

    }
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }
    registerOnTouched() {

    }
}