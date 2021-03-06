// ------------------------------------------------------------------------------
// ----- areYouSure.modal.ts ----------------------------------------------------
// ------------------------------------------------------------------------------

// copyright:   2016 WiM - USGS
//
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping             
//
// purpose: modal used in all project tabs to make sure they want to leave the page if it's form is dirty

import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from "app/shared/services/dialog.service";

@Component({
  selector: 'areYouSureModal',
  template: `  
    <ng-template #areYouSure  id="sureModal" let-c="close" let-d="dismiss">  
        <div class="modal-header">
            <h4 class="modal-title">WARNING</h4>
            <!--<button type="button" class="close" aria-label="Close" (click)="d('Cross click')"><span aria-hidden="true">&times;</span></button>-->
        </div>
        <div class="modal-body">
            <p>{{ModalMessage}}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="sigl-btn" (click)="c('Yes')">Yes</button>
            <button type="button" class="sigl-btn btn-orange" (click)="c('Cancel')">Cancel</button>
            <!-- <button type="button" class="btn btn-secondary" (click)="c('Close click')">Close</button> -->
        </div>
    </ng-template>
    `
})

export class AreYouSureModal {    
    @ViewChild('areYouSure') public areYouSureModal;    
    @Input() message: string;
    @Output() modalResponseEvent = new EventEmitter<boolean>(); // when they hit save, emit to projectdata.component

    private modalElement: any;
    public CloseResult:any;
    public ModalMessage: string;
    private messageSubscript;

    constructor(private _dialogService: DialogService, private _modalService: NgbModal){ 
        this.message = "";     
    }
    
    ngOnInit() {        
        this.messageSubscript = this._dialogService.MessageToShow.subscribe(m => { this.message = m; });
      //show the filter modal == Change Filters button was clicked in sidebar
        
        this.modalElement = this.areYouSureModal;
    }
     
    public showSureModal(): void {
        this.ModalMessage = this.message !== "" ? this.message : "Something is not quite right.";
        
        this._modalService.open(this.modalElement, {backdrop: 'static', keyboard: false} ).result.then((result) =>{
            // this is the solution for the first modal losing scrollability
            if (document.querySelector('body > .modal')) {
                document.body.classList.add('modal-open');
            }
            if (result == "Yes")
                this.modalResponseEvent.emit(true);
            else this.modalResponseEvent.emit(false);
        }, (reason) => {
            this.CloseResult = `Dismissed ${this.getDismissReason(reason)}`
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) return 'by pressing ESC';
        else if (reason === ModalDismissReasons.BACKDROP_CLICK) return 'by clicking on a backdrop';
        else return  `with: ${reason}`;
    }

    ngOnDestroy() {
        this.messageSubscript.unsubscribe();
        this.modalElement = undefined;
    }
    /*
        Help with making this not rely on a service go-between
        https://plnkr.co/edit/TyvCfbntYGHhaLI5fbeq?p=preview
    */
}