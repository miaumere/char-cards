import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { insertDeleteInfo } from 'src/app/modules/shared/functions/insert-delete.info';
import { BaseComponent } from 'src/app/core/base.component';

@Component({
    selector: 'app-chapter-starring-characters',
    templateUrl: './chapter-starring-characters.component.html',
    styleUrls: ['./chapter-starring-characters.component.scss'],
})
export class ChapterStarringCharactersComponent
    extends BaseComponent
    implements OnInit
{
    insertDeleteInfo = () =>
        insertDeleteInfo(this._toastrService, this._translate);

    constructor(
        private _toastrService: ToastrService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit(): void {}
}
