import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CharacterItem } from 'src/app/model/characters/character-item.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private _getCharactersURL = '/api/get-characters';

  public charList$ = new BehaviorSubject<CharacterItem[]>(null);

  constructor(private http: HttpClient) {
    this.getCharacters().subscribe()
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return of(this.charList$);
  }


  getCharacters(): Observable<CharacterItem[]> {
    return this.http.get<CharacterItem[]>(this._getCharactersURL)
      .pipe(
        tap(response => {
          console.warn("New RESPONSE...")
          this.charList$.next(response);
        })
      );
  }

}
