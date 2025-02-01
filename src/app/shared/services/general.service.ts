import { Injectable } from '@angular/core';
import { CurrentCardVisible } from '../interfaces/general.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private showSpinnerGlobal: boolean = false;
  propCardVisible:string[] = [];
  numbersImageVisible: number = 0;

  get showSpinner(): boolean {
    return this.showSpinnerGlobal;
  }

  get cardVisible(): string[] {
    return this.propCardVisible;
  }

  set setSpinnerValue(value: boolean) {
    if(value) {
      document.body.style.overflow = "hidden";
    }

    if(!value) {
      document.body.style.overflow = "";
    }

    setTimeout(() => this.showSpinnerGlobal = value);
  }

  constructor() { }
}
