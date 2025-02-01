import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Entry } from '../../interfaces/game.interface';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-card-animals',
  templateUrl: './card-animals.component.html',
  styleUrls: ['./card-animals.component.css']
})
export class CardAnimalsComponent implements OnInit {
  @Input() dataAnimal!: Entry;
  @Input() isRevealed: boolean = false;  // Si la carta está revelada
  @Input() isMatched: boolean = false;  // Si la carta ya está emparejada
  @Output() cardClicked = new EventEmitter<void>();  // Evento para notificar que se hizo clic


  rotateImage: boolean = false;
  hiddenPokeImg: boolean = false;
  deleteImage: boolean = false;

  constructor(
    private generalService: GeneralService
  ){}

  get numbersImageVisible(): number {
    return this.generalService.numbersImageVisible;
  }

  ngOnInit(): void {
      // console.log(this.dataAnimal);
  }

  removeClass(id1: string, id2: string): void {
    const newId1: string = id1 + "poke";
    const newId2: string = id2 + "poke";
  }

  resetParams(): void {
    this.rotateImage = false;
    this.hiddenPokeImg = false;
    this.generalService.propCardVisible = [];
    this.generalService.numbersImageVisible = 0;
  }

  checkSameId(): void {
    setTimeout(() => {
      if(this.numbersImageVisible == 2) {
        const id1: string = this.generalService.propCardVisible[0];
        const id2: string = this.generalService.propCardVisible[1];      
        
        if(id1 === id2) {
          this.removeClass(id1, id2);
        }
        else {
          this.resetParams();
        }
      }
    },1500)
  }
  
  onClickCard(): void {
    this.rotateImage = true;
    this.hiddenPokeImg = true;
    this.generalService.propCardVisible.push(this.dataAnimal.meta.uuid);
    this.generalService.numbersImageVisible++;
    this.checkSameId();
  }

  onClick() {
    
    // Solo permitir el clic si la carta no está emparejada
    if (!this.isMatched) {
      
      this.cardClicked.emit();  // Emitir evento para que el componente padre maneje el clic
    }
  }

}
