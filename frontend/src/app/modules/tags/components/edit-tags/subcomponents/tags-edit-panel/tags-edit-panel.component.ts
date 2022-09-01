import { BaseComponent } from 'src/app/core/base.component';
import { Component, OnInit } from '@angular/core';
import { TagsService } from 'src/app/core/service/tags.service';
import { Tag } from 'src/app/modules/tags/models/tag.model';
import { MatDialog } from '@angular/material/dialog';
import {
    TagDialogData,
    TagEditDialogComponent,
} from './tag-edit-dialog/tag-edit-dialog.component';

@Component({
    selector: 'app-tags-edit-panel',
    templateUrl: './tags-edit-panel.component.html',
    styleUrls: ['./tags-edit-panel.component.scss'],
})
export class TagsEditPanelComponent extends BaseComponent implements OnInit {
    tags: Tag[] = [];

    constructor(private _tagsService: TagsService, public dialog: MatDialog) {
        super();
    }

    ngOnInit(): void {
        this.getAllTags();
    }

    getAllTags() {
        this.subscriptions$.add(
            this._tagsService.getAllTags().subscribe((tags) => {
                this.tags = tags;
            })
        );
    }

    openNewTagDialog(tag?: Tag) {
        const dialogData: TagDialogData = {
            tagData: tag,
        };
        const dialogRef = this.dialog.open(TagEditDialogComponent, {
            data: dialogData,
        });

        dialogRef.afterClosed().subscribe(() => {
            this.getAllTags();
        });
    }
}
