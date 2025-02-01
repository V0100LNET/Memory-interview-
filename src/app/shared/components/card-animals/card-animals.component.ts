import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entry } from '../../interfaces/game.interface';

@Component({
  selector: 'app-card-animals',
  templateUrl: './card-animals.component.html',
  styleUrls: ['./card-animals.component.css']
})
export class CardAnimalsComponent {
  @Input() dataAnimal!: Entry;
  @Input() isRevealed: boolean = false;  
  @Input() isMatched: boolean = false; 
  @Output() cardClicked = new EventEmitter<void>(); 

  onClick() {    
    if(!this.isMatched && !this.isRevealed) {
      this.cardClicked.emit();
    }
  }
}
