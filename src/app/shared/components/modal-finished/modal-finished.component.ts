import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-finished',
  templateUrl: './modal-finished.component.html',
  styleUrls: ['./modal-finished.component.css']
})
export class ModalFinishedComponent {
  constructor(
    private dialogRef: MatDialogRef<string>
  ) {}

  restartGame(): void {
    this.dialogRef.close("restart");
  }

  backHome(): void {
    this.dialogRef.close("back");
  }
}
