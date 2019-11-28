import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CharacterItem, CharacterForListItem } from 'src/app/model/characters/character-item.model';
import { Character } from 'src/app/model/characters/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private _getNonArchivedCharactersURL = '/api/characters-list/get-characters';
  private _getCharacterByIdURL = '/api/characters-list/get-character';
  private _getAllCharactersURL = '/api/characters-list/get-all-characters'

  public charList$ = new BehaviorSubject<CharacterItem[] | null>(null);

  constructor(private http: HttpClient) {
    this.getCharacters().subscribe();
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return of(this.charList$);
  }


  // only characters which aren't archived:
  getCharacters(): Observable<CharacterItem[]> {
    return this.http.get<CharacterItem[]>(this._getNonArchivedCharactersURL)
      .pipe(
        tap(response => {
          this.charList$.next(response);
        })
      );
  }

  // archived and non-archived characters:
  getAllCharacters(): Observable<CharacterForListItem[]> {
    return this.http.get<CharacterForListItem[]>(this._getAllCharactersURL);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this._getCharacterByIdURL}/${id}`);
  }

}
