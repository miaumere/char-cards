import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ITag, Tag } from './../../modules/tags/models/tag.model';

@Injectable({
    providedIn: 'root',
})
export class TagsService {
    private readonly _tagsControllerURL = '/api/tags';

    private readonly _getAllTagsURL = `${this._tagsControllerURL}/get-tags`;
    private readonly _upsertTagURL = `${this._tagsControllerURL}/upsert-tag`;
    private readonly _deleteTagURL = `${this._tagsControllerURL}/delete-tag`;

    constructor(private http: HttpClient) {}

    getAllTags() {
        return this.http.get<ITag[]>(this._getAllTagsURL).pipe(
            map((response) => {
                const mappedResponse = response.map((r) => new Tag(r));
                return mappedResponse;
            })
        );
    }

    upsertTag(requestBody: ITag) {
        return this.http.post<ITag>(this._upsertTagURL, requestBody);
    }

    deleteTag(id: number) {
        const params = new HttpParams().set('id', '' + id);

        return this.http.delete<void>(this._deleteTagURL, { params });
    }
}
