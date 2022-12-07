import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Tag, ITag } from './../../../../../models/tag.model';
import { Component, Inject, OnInit } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialog,
} from '@angular/material/dialog';
import { BaseComponent } from 'src/app/core/base.component';
import {
    CropProfilePicDialogData,
    CropProfilePicComponent,
} from 'src/app/modules/characters/components/characters-article/components/character-card/subcomponents/char-information/subcomponents/profile-pic/crop-profile-pic/crop-profile-pic.component';
import { TagsService } from 'src/app/core/service/tags.service';
import { generateRandomColor } from 'src/app/modules/shared/functions/colors.function';

export interface TagDialogData {
    tagData?: Tag;
}

@Component({
    selector: 'app-tag-edit-dialog',
    templateUrl: './tag-edit-dialog.component.html',
    styleUrls: ['./tag-edit-dialog.component.scss'],
})
export class TagEditDialogComponent extends BaseComponent implements OnInit {
    tagForm: UntypedFormGroup = new UntypedFormGroup({
        name: new UntypedFormControl('', Validators.required),
        color: new UntypedFormControl(generateRandomColor()),
    });
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: TagDialogData,
        public dialogRef: MatDialogRef<TagEditDialogComponent>,
        public dialog: MatDialog,
        private _tagsService: TagsService
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.data.tagData) {
            this.tagForm.get('name')?.patchValue(this.data.tagData?.name);
            this.tagForm.get('color')?.patchValue(this.data.tagData?.color);
        }
    }

    closeDialog() {
        this.dialogRef.close(false);
    }

    deleteTag() {
        if (!!this.data.tagData && !!this.data.tagData?.id) {
            this.subscriptions$.add(
                this._tagsService
                    .deleteTag(this.data.tagData?.id)
                    ?.subscribe(() => {
                        this.closeDialog();
                    })
            );
        }
    }

    saveTag() {
        const tagRequest: ITag = {
            id: this.data.tagData?.id,
            name: this.tagForm.get('name')?.value,
            color: this.tagForm.get('color')?.value,
        };
        this.subscriptions$.add(
            this._tagsService.upsertTag(tagRequest).subscribe(() => {
                this.closeDialog();
            })
        );
    }
}
