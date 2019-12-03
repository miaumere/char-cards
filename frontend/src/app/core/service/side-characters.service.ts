import { SideCharForChange } from './../../modules/admin-panel/models/side-char-for-change.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SideCharacter, SideCharacterForListItem } from 'src/app/modules/side-characters/models/side-characters.model';
import { NewSideChar } from 'src/app/modules/admin-panel/models/new-side-char.model';

@Injectable({
  providedIn: 'root'
})
export class SideCharactersService {
  sideCharacterControllerURL = '/api/side-characters';

  getNonArchivedSideCharactersURL = `${this.sideCharacterControllerURL}/side-characters`;
  getAllSideCharactersURL = `${this.sideCharacterControllerURL}/all-side-characters`;
  patchSideCharactersStateURL = `${this.sideCharacterControllerURL}/change-state`;
  postNewCharacterURL = `${this.sideCharacterControllerURL}/new-side-character`;


  constructor(private http: HttpClient) { }

  getSideCharacters(): Observable<SideCharacter[]> {
    return this.http.get<SideCharacter[]>(this.getNonArchivedSideCharactersURL);
  }

  getAllSideCharacters(): Observable<SideCharacterForListItem[]> {
    return this.http.get<SideCharacterForListItem[]>(this.getAllSideCharactersURL);
  }

  patchSideCharacterState(requestBody: SideCharForChange[]): Observable<SideCharForChange[]> {
    return this.http.patch<SideCharForChange[]>(this.patchSideCharactersStateURL, requestBody);
  }

  postNewCharacter(formData: FormData): Observable<NewSideChar> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };
    return this.http.post<NewSideChar>(this.postNewCharacterURL, formData, httpOptions);
  }

}
