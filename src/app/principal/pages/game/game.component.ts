import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { DataAnimals } from 'src/app/shared/interfaces/game.interface';
import { GameService } from 'src/app/shared/services/game.service';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  cardAnimals: DataAnimals | null = null;

  constructor(
    private matDialog: MatDialog,
    private generalService: GeneralService,
    private gameService: GameService
  ){}

  ngOnInit(): void {
    // this.showModal();
    this.showSpinner();
    this.getDataAnimals();
  }

  get getNamePlayer(): string | null {
    return localStorage.getItem("playerName") ?? null;
  }

  getDataAnimals(): void {
    this.gameService.getDataAnimal().subscribe((response: DataAnimals) => {      
      this.cardAnimals = response;
    })
  }
  
  showModal(): void {
    const dialog = this.matDialog.open(ModalComponent, {
      disableClose: true,
      data: false,
      panelClass: 'modal-width'
    })

    dialog.afterClosed().subscribe(close => {
      this.getDataAnimals();
    })
  }
  
  showSpinner(): void {
    setTimeout(() => {
      this.generalService.setSpinnerValue = false;
    },2500)
  }
}
