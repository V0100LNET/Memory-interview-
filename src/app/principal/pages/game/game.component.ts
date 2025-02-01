import { ModalFinishedComponent } from 'src/app/shared/components/modal-finished/modal-finished.component';
import { DataAnimals, RevealedCards, ScorePlayer } from 'src/app/shared/interfaces/game.interface';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { GeneralService } from 'src/app/shared/services/general.service';
import { GameService } from 'src/app/shared/services/game.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  cardAnimals: DataAnimals | null = null;
  revealedCards: RevealedCards[] = [];
  matchedCards: Set<string> = new Set();
  numScoredBad: number = 0;
  numScoreGood: number = 0;
  noContentToDisplay: boolean = false;
  showAnimations: boolean = false;

  constructor(
    private matDialog: MatDialog,
    private generalService: GeneralService,
    private gameService: GameService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.showSpinner();
    this.getDataAnimals();
  }

  get getNamePlayer(): string | null {
    return localStorage.getItem("playerName") ?? null;
  }

  get scoreBad(): number | string{
    return (this.numScoredBad == 0) ? "- - -" : this.numScoredBad;
  }

  get scoreGood(): number | string {
    return (this.numScoreGood == 0) ? "- - -" : this.numScoreGood;
  }

  getDataAnimals(): void {
    this.gameService.getDataAnimal().subscribe((response: DataAnimals) => {      
      if(!response) {
        this.noContentToDisplay = true;
        return;
      }

      this.cardAnimals = response;
      this.noContentToDisplay = false;
    })
  }

  resetParams(): void {
    this.revealedCards = [];
    this.matchedCards = new Set();
    this.numScoredBad = 0;
    this.numScoreGood = 0;
    this.noContentToDisplay = false;
  }

  removeClass(): void {
    document.body.style.overflow = "visible";
  }
  
  showModalStart(): void {
    const dialog = this.matDialog.open(ModalComponent, {
      disableClose: true,
      data: false,
      panelClass: 'modal-width'
    })
  }

  showModalFineshed(): void {
    this.showAnimations = true;
    let score: ScorePlayer = { scoreBad: this.scoreBad, scoreGood: this.scoreGood }    

    const dialog = this.matDialog.open(ModalFinishedComponent, {
      disableClose: true,
      data: score,
    })

    dialog.afterClosed().subscribe(close => {
      if(close == 'back') {
        this.removeClass();
        this.router.navigateByUrl("principal/home");
        this.showAnimations = false;
      }

      if(close == 'restart') {
        this.removeClass();
        this.resetParams();
        this.showAnimations = false;
        this.getDataAnimals();
      }
    })
  }
  
  showSpinner(): void {
    setTimeout(() => {
      this.generalService.setSpinnerValue = false;
      this.showModalStart();
    },1500)
  }

  onClickCard(cardId: string, cardIndex: number) {       
    if(this.matchedCards.has(cardId) || this.revealedCards.length == 2) {
      return;
    }

    this.revealedCards.push({ cardId, cardIndex });

    if (this.revealedCards.length === 2) {
      this.checkMatch();
    }
  }

  checkMatch() {
    const [firstCard, secondCard]: RevealedCards[] = this.revealedCards;

    if (firstCard.cardId === secondCard.cardId) {
      this.matchedCards.add(firstCard.cardId);
      this.numScoreGood++; 
    }
    else {
      this.numScoredBad++;
    } 

    setTimeout(() => {
      this.revealedCards = [];
    }, 1000);

    if (this.matchedCards.size === this.cardAnimals!.entries.length/2) {
      this.showModalFineshed();
    }
  }

  reveledCards(index: number): boolean {
    return this.revealedCards.some(card => card.cardIndex === index) ||
           this.matchedCards.has(this.cardAnimals!.entries[index].meta.uuid);
  }
  
}
