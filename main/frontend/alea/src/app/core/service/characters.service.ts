import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CharacterItem } from 'src/app/model/characters/character-item.model';
import { Character } from 'src/app/model/characters/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private _getCharactersURL = '/api/get-characters';
  private _getCharacterByIdURL = '/api/get-character';

  public charList$ = new BehaviorSubject<CharacterItem[]>(null);

  constructor(private http: HttpClient) {
    this.getCharacters().subscribe();
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return of(this.charList$);
  }


  getCharacters(): Observable<CharacterItem[]> {
    return this.http.get<CharacterItem[]>(this._getCharactersURL)
      .pipe(
        tap(response => {
          console.warn('New RESPONSE...');
          this.charList$.next(response);
        })
      );
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this._getCharacterByIdURL}/${id}`);
  }

}
