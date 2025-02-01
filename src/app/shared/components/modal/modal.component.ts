import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(
    private dialogRef: MatDialogRef<boolean>
  ) {}

  closeModal(): void {
    this.dialogRef.close(true);
  }
}
