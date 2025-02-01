import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  form: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private generalService: GeneralService
    
  ){}

  get getName(): string {
    return this.form.get('name')?.value;
  }

  setNameLocalStorage(): void {
    localStorage.setItem('playerName', this.getName);
  }

  showSpinner(): void {
    this.generalService.setSpinnerValue = true;
  }

  sendName(): void {
    if(!this.getName) {
      this.form.get('name')?.markAsTouched();
      return;
    }
    
    this.showSpinner();
    this.setNameLocalStorage();
    this.router.navigateByUrl('/principal/game');
  }
}
