import { EditRelation } from './../../modules/admin-panel/models/edit-relation.model';
import { ISideCharacterDetails } from './../../modules/admin-panel/models/side-characters-details.model';
import { EditSideCharacterDetails } from './../../modules/admin-panel/models/edit-side-character-details.model';
import { SideCharForChange } from './../../modules/admin-panel/models/side-char-for-change.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NewSideChar } from 'src/app/modules/admin-panel/models/new-side-char.model';
import { IBook } from 'src/app/modules/admin-panel/models/book.model';
import { map } from 'rxjs/operators';
import { ISideCharacter } from 'src/app/modules/side-characters/models/side-character.model';
import { ISideCharacterForListItem } from 'src/app/modules/side-characters/models/side-character-for-list-item.model';
import { IRelationship } from 'src/app/modules/side-characters/models/relationships.model';

@Injectable({
  providedIn: 'root'
})
export class SideCharactersService {
  readonly sideCharacterControllerURL = '/api/side-characters';

  readonly getNonArchivedSideCharactersURL = `${this.sideCharacterControllerURL}/side-characters`;
  readonly getAllSideCharactersURL = `${this.sideCharacterControllerURL}/all-side-characters`;
  readonly getSideCharacterDetailsURL = `${this.sideCharacterControllerURL}/side-details`;
  readonly getBooksURL = `${this.sideCharacterControllerURL}/books`;
  readonly getRelationsURL = `${this.sideCharacterControllerURL}/relations`;

  readonly putSideCharacterDetailsURL = `${this.sideCharacterControllerURL}/edit-side-details`;

  readonly patchRelationNameURL = `${this.sideCharacterControllerURL}/edit-relation`;
  readonly patchSideCharactersStateURL = `${this.sideCharacterControllerURL}/change-state`;

  readonly postNewCharacterURL = `${this.sideCharacterControllerURL}/new-side-character`;
  readonly postEditProfilePicURL = `${this.sideCharacterControllerURL}/edit-side-pic`;

  readonly deleteRelationURL = `${this.sideCharacterControllerURL}/delete-relation`;

  constructor(private http: HttpClient) { }

  getSideCharacters(name?: string, books?: number[], relatedTo?: number) {
    const params = new HttpParams()
      .set('name', '' + name)
      .set('books', '' + books)
      .set('relatedTo', '' + relatedTo);

    return this.http.get<ISideCharacter[]>(this.getNonArchivedSideCharactersURL, { params });
  }

  getBooks() {
    return this.http.get<IBook[]>(this.getBooksURL);
  }

  getAllSideCharacters() {
    return this.http.get<ISideCharacterForListItem[]>(this.getAllSideCharactersURL);
  }

  getSideCharacterDetails(id: number) {
    const params = new HttpParams().set('id', '' + id);

    return this.http.get<ISideCharacterDetails>(this.getSideCharacterDetailsURL, { params });
  }

  getRelationsForSideChar(id: number) {
    const params = new HttpParams().set('id', '' + id);

    return this.http.get<IRelationship[]>(this.getRelationsURL, { params });
  }

  putSideCharacterDetails(requestBody: EditSideCharacterDetails) {
    return this.http.put<EditSideCharacterDetails>(this.putSideCharacterDetailsURL, requestBody);
  }

  patchSideCharacterState(requestBody: SideCharForChange) {
    return this.http.patch<SideCharForChange>(this.patchSideCharactersStateURL, requestBody);
  }

  patchRelationName(requestBody: EditRelation) {
    return this.http.patch<EditRelation>(this.patchRelationNameURL, requestBody);
  }

  postNewCharacter(formData: FormData) {
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
    return this.http.post<void>(this.postEditProfilePicURL, formData, httpOptions);
  }


  getSideCharacter(charId: number) {
    return this.getAllSideCharacters()
      .pipe(
        map(sideCharArray => sideCharArray.filter(sideChar => sideChar.externalId === charId))
      )
  }

  deleteRelationsForSideChar(relationId: number) {
    const params = new HttpParams().set('id', '' + relationId);
    return this.http.delete<void>(this.deleteRelationURL, { params });
  }

}
