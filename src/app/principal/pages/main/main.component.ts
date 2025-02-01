import { Component } from '@angular/core';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(
    private generalService: GeneralService
  ){}

  get showSpinner(): boolean {
    return this.generalService.showSpinner;
  }
}
