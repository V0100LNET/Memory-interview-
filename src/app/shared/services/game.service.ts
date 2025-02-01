import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataAnimals, Entry } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private urlData: string = "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=2";

  constructor(
    private httpClient: HttpClient
  ) { }

  sortElements(array: Entry[]): Entry[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  getDataAnimal(): Observable<DataAnimals> {
    return this.httpClient.get<DataAnimals>(this.urlData).pipe(
      map(data => {
        const duplicatedEntries: Entry[] = [...data.entries, ...data.entries];
        return {...data, entries: this.sortElements(duplicatedEntries) }
      })
    );
  }
}
