import { IEditStarringCharacter } from 'src/app/modules/characters/models/starring-in/edit-starring-character.model';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
    IChapterWithChars,
    ChapterWithChars,
} from 'src/app/modules/pages/models/pages/chapter-with-chars.model';
import { IBook, Book } from 'src/app/modules/pages/models/books/book.model';
import { ChapterRequest } from 'src/app/modules/pages/models/chapters/edit-chapter.model';
import {
    IStarringCharacter,
    StarringCharacter,
} from 'src/app/modules/characters/models/starring-in/starring-character.model';

@Injectable({
    providedIn: 'root',
})
export class StoryService {
    private readonly storyControllerURL = '/api/stories';

    private readonly _getAllBooksURL = `${this.storyControllerURL}/get-all-books`;
    private readonly _getStarringCharactersForChapterURL = `${this.storyControllerURL}/get-starring-characters`;
    private readonly _getChaptersWithCharsURL = `${this.storyControllerURL}/get-chapters-with-characters`;

    private readonly _upsertBookURL = `${this.storyControllerURL}/upsert-book`;
    private readonly _upsertChapterURL = `${this.storyControllerURL}/edit-chapter`;
    private readonly _newPagesURL = `${this.storyControllerURL}/new-pages`;
    private readonly _editStarringCharacterURL = `${this.storyControllerURL}/edit-starring-character`;

    private readonly _patchBookOrderURL = `${this.storyControllerURL}/edit-book-order`;
    private readonly _patchChapterOrderURL = `${this.storyControllerURL}/edit-chapter-order`;
    private readonly _patchPagesOrderURL = `${this.storyControllerURL}/edit-pages-order`;
    private readonly _patchChangeChapterVisibilityURL = `${this.storyControllerURL}/change-visibility`;

    private readonly _deleteBookURL = `${this.storyControllerURL}/delete-book`;
    private readonly _deleteChapterURL = `${this.storyControllerURL}/delete-chapter`;
    private readonly _deletePageURL = `${this.storyControllerURL}/delete-page`;
    private readonly _deleteCharFromChapterURL = `${this.storyControllerURL}/delete-char-from-chapter`;

    constructor(private http: HttpClient) {}

    getAllBooks() {
        return this.http.get<IBook[]>(this._getAllBooksURL).pipe(
            map((response) => {
                const mappedResponse = response.map((r) => new Book(r));
                return mappedResponse;
            })
        );
    }

    getChaptersForBook(id: number) {
        const params = new HttpParams().set('id', '' + id);

        return this.http
            .get<IChapterWithChars[]>(this._getChaptersWithCharsURL, { params })
            .pipe(
                map((response) => {
                    const mappedResponse = response.map(
                        (r) => new ChapterWithChars(r)
                    );
                    return mappedResponse;
                })
            );
    }

    getChaptersWithChars(bookId: number) {
        const params = new HttpParams().set('id', '' + bookId);

        return this.http
            .get<IChapterWithChars[]>(this._getChaptersWithCharsURL, { params })
            .pipe(
                map((response) => {
                    const mappedResponse = response.map(
                        (r) => new ChapterWithChars(r)
                    );
                    return mappedResponse;
                })
            );
    }

    getStarringCharactersForChapter(id: number) {
        const params = new HttpParams().set('chapterId', '' + id);

        return this.http
            .get<IStarringCharacter[]>(
                this._getStarringCharactersForChapterURL,
                { params }
            )
            .pipe(
                map((response) => {
                    const mappedResponse = response.map(
                        (r) => new StarringCharacter(r)
                    );
                    return mappedResponse;
                })
            );
    }

    postStarringCharacters(requestBody: IEditStarringCharacter) {
        return this.http.post<IEditStarringCharacter>(
            this._editStarringCharacterURL,
            requestBody
        );
    }

    upsertBook(request: IBook) {
        return this.http.post<IBook>(this._upsertBookURL, request);
    }

    postPages(formData: FormData, chapterId: number) {
        const params = new HttpParams().set('chapterId', '' + chapterId);

        const httpOptions = {
            headers: new HttpHeaders({
                Accept: 'application/json',
                CacheControl: 'max-age=0',
            }),
            params,
        };
        return this.http.post<void>(this._newPagesURL, formData, httpOptions);
    }

    upsertChapter(requestBody: Partial<ChapterRequest>) {
        return this.http.post<Partial<ChapterRequest>>(
            this._upsertChapterURL,
            requestBody
        );
    }

    patchBookSequence(requestBody: number[]) {
        return this.http.patch<number[]>(this._patchBookOrderURL, requestBody);
    }

    patchChapterSequence(requestBody: number[], bookId: number) {
        const params = new HttpParams().set('bookId', '' + bookId);

        return this.http.patch<number[]>(
            this._patchChapterOrderURL,
            requestBody,
            { params }
        );
    }

    patchPageSequence(requestBody: number[], chapterId: number) {
        const params = new HttpParams().set('chapterId', '' + chapterId);

        return this.http.patch<number[]>(
            this._patchPagesOrderURL,
            requestBody,
            { params }
        );
    }

    patchChapterVisibility(chapterId: number, visibility: boolean) {
        const body = {
            chapterId,
            visibility,
        };

        return this.http.patch<number[]>(
            this._patchChangeChapterVisibilityURL,
            body
        );
    }

    deleteBook(id: number) {
        const params = new HttpParams().set('id', '' + id);
        return this.http.delete<void>(this._deleteBookURL, { params });
    }

    deleteChapter(id: number) {
        const params = new HttpParams().set('id', '' + id);
        return this.http.delete<void>(this._deleteChapterURL, { params });
    }

    deletePage(pageId: number) {
        const params = new HttpParams().set('pageId', '' + pageId);
        return this.http.delete<void>(this._deletePageURL, { params });
    }

    deleteCharFromChapter(id: number) {
        const params = new HttpParams().set('id', '' + id);
        return this.http.delete<void>(this._deleteCharFromChapterURL, {
            params,
        });
    }
}
