import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ModalComponent } from './components/modal/modal.component';
import { MaterialModule } from '../material/material.module';
import { CardAnimalsComponent } from './components/card-animals/card-animals.component';
import { ModalFinishedComponent } from './components/modal-finished/modal-finished.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    ModalComponent,
    CardAnimalsComponent,
    ModalFinishedComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SpinnerComponent,
    CardAnimalsComponent
  ]
})
export class SharedModule { }
