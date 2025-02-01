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
  revealedCards: any[] = [];
  matchedCards: Set<string> = new Set();
  isGameComplete: boolean = false;

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

  // Lógica para manejar el clic en una carta
  onClickCard(cardId: string, cardIndex: number) {    
    // Solo permitir el clic si la carta no está emparejada
    if (this.matchedCards.has(cardId) || this.revealedCards.length >= 2) {
      console.log('ya tiene pareja');
      
      return; // No hacemos nada si ya es un par emparejado o si ya hay dos cartas reveladas
    }

    // Revelar la carta
    this.revealedCards.push({ cardId, cardIndex });

    // Si tenemos dos cartas reveladas, las comparamos
    if (this.revealedCards.length === 2) {
      this.checkMatch();
    }
  }

  // Lógica para verificar si las dos cartas reveladas son iguales
  checkMatch() {
    const [firstCard, secondCard] = this.revealedCards;

    // Verificar si las cartas coinciden
    if (firstCard.cardId === secondCard.cardId) {
      this.matchedCards.add(firstCard.cardId);  // Agregar el id a las parejas encontradas
    } 

    setTimeout(() => {
      this.revealedCards = [];  // Ocultar las cartas
    }, 1000);

    // Revisar si se completaron todas las parejas
    if (this.matchedCards.size === this.cardAnimals!.entries.length / 2) {
      this.isGameComplete = true;  // El juego ha terminado
      console.log('terminado');
      
    }
  }

  reveledCards(index: number): boolean {
    return this.revealedCards.some(card => card.cardIndex === index) ||
           this.matchedCards.has(this.cardAnimals!.entries[index].meta.uuid);
  }
  
}
