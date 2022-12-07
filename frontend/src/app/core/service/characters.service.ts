import { UntypedFormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import {
    AllPreferences,
    IAllPreferences,
} from 'src/app/modules/characters/models/all-preferences.model';
import { CharacterForChange } from 'src/app/modules/characters/models/character-for-change.model';
import {
    CharacterItem,
    ICharacterItem,
} from 'src/app/modules/characters/models/character-item.model';
import { StoryRequest } from 'src/app/modules/characters/models/character-story/story-request.model';
import {
    IStory,
    Story,
} from 'src/app/modules/characters/models/character-story/story.model';
import {
    Character,
    ICharacter,
} from 'src/app/modules/characters/models/character.model';
import {
    EditCharacter,
    IEditCharacter,
} from 'src/app/modules/characters/models/edit-character.model';
import { EditImageName } from 'src/app/modules/characters/models/images/edit-image-name.model';
import { IEditPreference } from 'src/app/modules/characters/models/preferences/edit-preferences.model';
import { IQuote } from 'src/app/modules/characters/models/quote.model';
import { UpsertQuote } from 'src/app/modules/characters/models/quotes/upsert-quote.model';
import {
    IRelationForCharacter,
    IRelationRequest,
    IRelationTreeDto,
    RelationTreeDto,
} from 'src/app/modules/characters/models/relations/relation-tree-dto.model';
import { ICoordinatesRequest } from './../../modules/characters/models/relations/relation-tree-dto.model';

@Injectable({
    providedIn: 'root',
})
export class CharactersService {
    private readonly charControllerURL = '/api/characters';

    private readonly _getCharacterByIdURL = `${this.charControllerURL}/get-character`;
    private readonly _getAllCharactersURL = `${this.charControllerURL}/get-all-characters`;
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
    private readonly _postUpsertCharacterURL = `${this.charControllerURL}/character`;

    private readonly _postEditImagesURL = `${this.charControllerURL}/new-images`;
    private readonly _postEditPreferenceURL = `${this.charControllerURL}/edit-preferences`;

    private readonly _putStoryIndexesURL = `${this.charControllerURL}/edit-story-indexes`;

    private readonly _deleteQuoteURL = `${this.charControllerURL}/delete-quote`;
    private readonly _deleteImageURL = `${this.charControllerURL}/delete-image`;
    private readonly _deleteStoryURL = `${this.charControllerURL}/delete-story`;
    private readonly _deletePreferenceURL = `${this.charControllerURL}/delete-preference`;
    private readonly _deleteCharacterURL = `${this.charControllerURL}/delete-character`;

    private emitChangeSource = new Subject<void>();
    form = new UntypedFormGroup({});
    changeEmitted$ = this.emitChangeSource.asObservable();

    constructor(private http: HttpClient) {}

    emitChange() {
        this.emitChangeSource.next();
    }

    getCharacters() {
        return this.http.get<ICharacterItem[]>(this._getAllCharactersURL).pipe(
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

    upsertCharacter(requestBody: EditCharacter) {
        return this.http.post<EditCharacter>(
            this._postUpsertCharacterURL,
            requestBody
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

    deleteCharacter(id: number) {
        const params = new HttpParams().set('id', '' + id);

        return this.http.delete<void>(this._deleteCharacterURL, { params });
    }
}
