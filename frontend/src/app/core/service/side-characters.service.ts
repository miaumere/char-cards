import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SideCharacter, SideCharacterForListItem } from 'src/app/modules/side-characters/models/side-characters.model';

@Injectable({
  providedIn: 'root'
})
export class SideCharactersService {
  sideCharacterControllerURL = '/api/side-characters';

  getNonArchivedSideCharactersURL = `${this.sideCharacterControllerURL}/side-characters`;
  getAllSideCharactersURL = `${this.sideCharacterControllerURL}/all-side-characters`;

  constructor(private http: HttpClient) { }

  getSideCharacters(): Observable<SideCharacter[]> {
    return this.http.get<SideCharacter[]>(this.getNonArchivedSideCharactersURL);
  }

  getAllSideCharacters(): Observable<SideCharacterForListItem[]> {
    return this.http.get<SideCharacterForListItem[]>(this.getAllSideCharactersURL);
  }

}
