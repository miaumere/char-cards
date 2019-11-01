import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CharacterItem } from 'src/app/model/characters/character-item.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private _getCharactersURL = '/api/get-characters';

  public charList$ = new BehaviorSubject<CharacterItem[]>([]);

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<CharacterItem[]> {
    return this.http.get<CharacterItem[]>(this._getCharactersURL)
      .pipe(
        tap(response => {
          this.charList$.next(response);
        })
      );
  }

}
