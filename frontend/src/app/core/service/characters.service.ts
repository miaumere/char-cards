import { ICoordinatesRequest } from './../../modules/characters/models/relations/relation-tree-dto.model';
import { StoryRequest } from './../../modules/admin-panel/models/character-story/story-request.model';
import { LoaderService } from './loader.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
    CharacterItem,
    ICharacterItem,
} from 'src/app/modules/characters/models/character-item.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, tap, finalize } from 'rxjs/operators';
import { ICharacterForListItem } from 'src/app/modules/characters/models/character-for-list-item.model';
import {
    Character,
    ICharacter,
} from 'src/app/modules/characters/models/character.model';

import { IQuote } from 'src/app/modules/characters/models/quote.model';
import {
    IEditCharacter,
    EditCharacter,
} from 'src/app/modules/admin-panel/models/edit-character.model';
import {
    IStory,
    Story,
} from 'src/app/modules/admin-panel/models/character-story/story.model';
import { CharacterForChange } from 'src/app/modules/admin-panel/models/character-for-change.model';
import { EditImageName } from 'src/app/modules/admin-panel/models/images/edit-image-name.model';
import { CreateCharacter } from 'src/app/modules/admin-panel/models/create-character.model';
import { IEditPreference } from 'src/app/modules/admin-panel/models/preferences/edit-preferences.model';
import {
    IAllPreferences,
    AllPreferences,
} from 'src/app/modules/characters/models/all-preferences.model';
import { UpsertQuote } from 'src/app/modules/admin-panel/models/quotes/upsert-quote.model';
import {
    IRelationForCharacter,
    IRelationRequest,
    IRelationTreeDto,
    RelationTreeDto,
} from 'src/app/modules/characters/models/relations/relation-tree-dto.model';

@Injectable({
    providedIn: 'root',
})
export class CharactersService {
    private readonly charControllerURL = '/api/characters';

    private readonly _getNonArchivedCharactersURL = `${this.charControllerURL}/get-characters`;
    private readonly _getCharacterByIdURL = `${this.charControllerURL}/get-character`;
    private readonly _getAllCharactersURL = `${this.charControllerURL}/get-all-characters`;
    private readonly _getCharacterDetailsURL = `${this.charControllerURL}/get-details`;
    private readonly _getQuotesURL = `${this.charControllerURL}/get-quotes`;
    private readonly _getStoriesForCharURL = `${this.charControllerURL}/get-stories-for-character`;
    private readonly _getHistoricalPreferencesForCharacterURL = `${this.charControllerURL}/get-characters-historical-preferences`;
    private readonly _getAllPreferencesForCharURL = `${this.charControllerURL}/get-all-preferences-for-character`;
    private readonly _getRelationsURL = `${this.charControllerURL}/relations`;
    private readonly _getRelationsTreeDataURL = `${this.charControllerURL}/relations-tree-data`;

    private readonly _patchChangeStateURL = `${this.charControllerURL}/change-state`;
    private readonly _patchImageNameURL = `${this.charControllerURL}/change-image-name`;
    private readonly _patchImagesOrderURL = `${this.charControllerURL}/change-images-order`;

    private readonly _postQuoteURL = `${this.charControllerURL}/upsert-quote`;
    private readonly _postUpsertStoryForCharacterURL = `${this.charControllerURL}/upsert-story`;
    private readonly _postRelationsURL = `${this.charControllerURL}/relations`;
    private readonly _postCoordsURL = `${this.charControllerURL}/coords`;

    private readonly _postNewCharacterURL = `${this.charControllerURL}/new-character`;
    private readonly _postEditImagesURL = `${this.charControllerURL}/new-images`;
    private readonly _postEditPreferenceURL = `${this.charControllerURL}/edit-preferences`;

    private readonly _putEditCharacterURL = `${this.charControllerURL}/edit-character`;
    private readonly _putStoryIndexesURL = `${this.charControllerURL}/edit-story-indexes`;

    private readonly _deleteQuoteURL = `${this.charControllerURL}/delete-quote`;
    private readonly _deleteImageURL = `${this.charControllerURL}/delete-image`;
    private readonly _deleteStoryURL = `${this.charControllerURL}/delete-story`;
    private readonly _deletePreferenceURL = `${this.charControllerURL}/delete-preference`;

    constructor(private http: HttpClient) {}

    // only characters which aren't archived:
    getCharacters() {
        return this.http
            .get<ICharacterItem[]>(this._getNonArchivedCharactersURL)
            .pipe(
                map((response) => {
                    const mappedResponse = response.map(
                        (r) => new CharacterItem(r)
                    );
                    return mappedResponse;
                })
            );
    }

    getAllPreferencesForChar(charId: number) {
        const params = new HttpParams().set('id', '' + charId);
        return this.http
            .get<IAllPreferences[]>(this._getAllPreferencesForCharURL, {
                params,
            })
            .pipe(
                map((response) => {
                    const mappedResponse = response.map(
                        (r) => new AllPreferences(r)
                    );
                    return mappedResponse;
                })
            );
    }
    //#region Relations
    getRelations(charId: number) {
        const params = new HttpParams().set('id', '' + charId);
        return this.http.get<IRelationForCharacter[]>(this._getRelationsURL, {
            params,
        });
    }

    getRelationsTreeData(charId: number) {
        const params = new HttpParams().set('id', '' + charId);

        return this.http
            .get<IRelationTreeDto>(this._getRelationsTreeDataURL, {
                params,
            })
            .pipe(
                map((rel) => {
                    return new RelationTreeDto(rel);
                })
            );
    }

    upsertRelations(request: IRelationRequest[], charId: number) {
        const params = new HttpParams().set('id', '' + charId);

        return this.http.post<IRelationRequest[]>(
            this._postRelationsURL,
            request,
            { params }
        );
    }

    upsertCoords(charId: number, request: ICoordinatesRequest[]) {
        const params = new HttpParams().set('id', '' + charId);

        return this.http.post<IRelationRequest[]>(
            this._postCoordsURL,
            request,
            { params }
        );
    }
    //#endregion

    // archived and non-archived characters:
    getAllCharacters() {
        return this.http
            .get<ICharacterForListItem[]>(this._getAllCharactersURL)
            .pipe(
                map((response) => {
                    const mappedResponse = response.map(
                        (r) => new CharacterItem(r)
                    );
                    return mappedResponse;
                })
            );
    }

    getCharacterById(id: number) {
        return this.http
            .get<ICharacter>(`${this._getCharacterByIdURL}/${id}`)
            .pipe(
                map((response) => {
                    response = new Character(response);
                    return response;
                })
            );
    }

    getQuotesForCharacter(id: number) {
        const params = new HttpParams().set('id', '' + id);

        return this.http.get<IQuote[]>(this._getQuotesURL, { params });
    }

    getCharacterDetails(id: number) {
        const params = new HttpParams().set('id', '' + id);

        return this.http.get<IEditCharacter>(this._getCharacterDetailsURL, {
            params,
        });
    }

    getStoriesForCharacter(id: number) {
        const params = new HttpParams().set('id', '' + id);
        return this.http
            .get<IStory[]>(this._getStoriesForCharURL, { params })
            .pipe(
                map((response) => {
                    const mappedResponse = response.map((r) => new Story(r));
                    return mappedResponse;
                })
            );
    }

    getCharactersHistoricalPreferences(charId: number, relatedCharId: number) {
        const params = new HttpParams()
            .set('charId', '' + charId)
            .set('relatedCharId', '' + relatedCharId);

        return this.http
            .get<IAllPreferences>(
                this._getHistoricalPreferencesForCharacterURL,
                { params }
            )
            .pipe(
                map((response) => {
                    const mappedResponse = new AllPreferences(response);
                    return mappedResponse;
                })
            );
    }

    patchCharacterState(requestBody: CharacterForChange) {
        return this.http.patch<CharacterForChange>(
            this._patchChangeStateURL,
            requestBody
        );
    }

    patchQuote(requestBody: UpsertQuote) {
        return this.http.patch<UpsertQuote>(this._postQuoteURL, requestBody);
    }

    patchImageName(requestBody: EditImageName) {
        return this.http.patch<EditImageName>(
            this._patchImageNameURL,
            requestBody
        );
    }

    patchImagesOrder(requestBody: number[]) {
        return this.http.patch<number[]>(
            this._patchImagesOrderURL,
            requestBody
        );
    }

    upsertStoryForCharacter(requestBody: StoryRequest) {
        return this.http.post<StoryRequest>(
            this._postUpsertStoryForCharacterURL,
            requestBody
        );
    }

    postNewCharacter(requestBody: CreateCharacter) {
        return this.http.post<void>(this._postNewCharacterURL, requestBody);
    }

    postEditImages(formData: FormData, charId: number) {
        const params = new HttpParams().set('id', '' + charId);

        const httpOptions = {
            headers: new HttpHeaders({
                Accept: 'application/json',
                CacheControl: 'max-age=0',
            }),
            params,
        };
        return this.http.post<void>(
            this._postEditImagesURL,
            formData,
            httpOptions
        );
    }

    postEditPreferences(requestBody: IEditPreference) {
        return this.http.post<IEditPreference>(
            this._postEditPreferenceURL,
            requestBody
        );
    }

    upsertNewQuote(requestBody: UpsertQuote) {
        return this.http.post<UpsertQuote>(this._postQuoteURL, requestBody);
    }

    putCharacterDetails(requestBody: EditCharacter, idDead: boolean) {
        const params = new HttpParams().set('isDead', '' + idDead);

        return this.http.put<EditCharacter>(
            this._putEditCharacterURL,
            requestBody,
            { params }
        );
    }

    putStoriesIndexes(requestBody: number[], charId: number) {
        const params = new HttpParams().set('id', '' + charId);

        return this.http.put<number[]>(this._putStoryIndexesURL, requestBody, {
            params,
        });
    }

    deleteQuote(quoteId: number) {
        const params = new HttpParams().set('id', '' + quoteId);
        return this.http.delete<void>(this._deleteQuoteURL, { params });
    }

    deleteImage(imageId: number) {
        const params = new HttpParams().set('id', '' + imageId);
        return this.http.delete<void>(this._deleteImageURL, { params });
    }

    deleteStory(storyId: number) {
        const params = new HttpParams().set('id', '' + storyId);
        return this.http.delete<void>(this._deleteStoryURL, { params });
    }

    deletePreference(id: number) {
        const params = new HttpParams().set('id', '' + id);

        return this.http.delete<void>(this._deletePreferenceURL, { params });
    }

    // custom methods:

    getCharacter(charId: number) {
        return this.getAllCharacters().pipe(
            tap((charArray) => charArray.filter((char) => char.id === charId))
        );
    }
}
