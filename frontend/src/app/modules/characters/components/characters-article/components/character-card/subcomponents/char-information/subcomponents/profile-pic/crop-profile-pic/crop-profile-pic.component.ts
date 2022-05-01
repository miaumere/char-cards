import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface CropProfilePicDialogData {
    animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
    selector: 'app-crop-profile-pic',
    templateUrl: './crop-profile-pic.component.html',
    styleUrls: ['./crop-profile-pic.component.scss'],
})
export class CropProfilePicComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: CropProfilePicDialogData
    ) {}

    ngOnInit(): void {}
}
