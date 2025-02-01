import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ModalComponent } from './components/modal/modal.component';
import { MaterialModule } from '../material/material.module';
import { CardAnimalsComponent } from './components/card-animals/card-animals.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    ModalComponent,
    CardAnimalsComponent
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
