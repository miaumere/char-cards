import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SideCharacter } from 'src/app/modules/side-characters/models/side-characters.model';

@Injectable({
  providedIn: 'root'
})
export class SideCharactersService {
  getSideCharactersURL = '/api/side-characters/side-characters';

  constructor(private http: HttpClient) { }

  getSideCharacters(): Observable<SideCharacter[]> {
    return this.http.get<SideCharacter[]>(this.getSideCharactersURL);
  }

}
