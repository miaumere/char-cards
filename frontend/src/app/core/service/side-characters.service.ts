import { EditSideCharacterDetails } from './../../modules/admin-panel/models/edit-side-character-details.model';
import { SideCharForChange } from './../../modules/admin-panel/models/side-char-for-change.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SideCharacter, SideCharacterForListItem } from 'src/app/modules/side-characters/models/side-characters.model';
import { NewSideChar } from 'src/app/modules/admin-panel/models/new-side-char.model';
import { SideCharacterDetails } from 'src/app/modules/admin-panel/models/side-characters-details.model';
import { Book } from 'src/app/modules/admin-panel/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class SideCharactersService {
  sideCharacterControllerURL = '/api/side-characters';

  getNonArchivedSideCharactersURL = `${this.sideCharacterControllerURL}/side-characters`;
  getAllSideCharactersURL = `${this.sideCharacterControllerURL}/all-side-characters`;
  getSideCharacterDetailsURL = `${this.sideCharacterControllerURL}/side-details`;
  getBooksURL = `${this.sideCharacterControllerURL}/books`;

  putSideCharacterDetailsURL = `${this.sideCharacterControllerURL}/edit-side-details`;


  patchSideCharactersStateURL = `${this.sideCharacterControllerURL}/change-state`;

  postNewCharacterURL = `${this.sideCharacterControllerURL}/new-side-character`;
  portEditProfilePicURL = `${this.sideCharacterControllerURL}/edit-side-pic`;


  constructor(private http: HttpClient) { }

  getSideCharacters(): Observable<SideCharacter[]> {
    return this.http.get<SideCharacter[]>(this.getNonArchivedSideCharactersURL);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.getBooksURL);
  }

  getAllSideCharacters(): Observable<SideCharacterForListItem[]> {
    return this.http.get<SideCharacterForListItem[]>(this.getAllSideCharactersURL);
  }

  getSideCharacterDetails(id: number): Observable<SideCharacterDetails> {
    const params = new HttpParams().set('id', '' + id);

    return this.http.get<SideCharacterDetails>(this.getSideCharacterDetailsURL, { params })
  }

  putSideCharacterDetails(requestBody: EditSideCharacterDetails): Observable<EditSideCharacterDetails> {
    return this.http.put<EditSideCharacterDetails>(this.putSideCharacterDetailsURL, requestBody);
  }

  patchSideCharacterState(requestBody: SideCharForChange): Observable<SideCharForChange> {
    return this.http.patch<SideCharForChange>(this.patchSideCharactersStateURL, requestBody);
  }

  postNewCharacter(formData: FormData): Observable<NewSideChar> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };
    return this.http.post<NewSideChar>(this.postNewCharacterURL, formData, httpOptions);
  }

  postEditProfilePic(formData: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        CacheControl: 'max-age=0'
      })
    };
    return this.http.post<void>(this.portEditProfilePicURL, formData, httpOptions);
  }


}
