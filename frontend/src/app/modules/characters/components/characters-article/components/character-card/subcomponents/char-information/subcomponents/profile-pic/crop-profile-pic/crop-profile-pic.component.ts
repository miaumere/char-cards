import { IProfilePic } from './../../../../../../../../../../admin-panel/models/images/profile-pic.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { base64ToFile } from './image-cropper/blob.utils';
import {
    ImageTransform,
    ImageCroppedEvent,
    Dimensions,
} from './image-cropper/image-cropper.component';

export interface CropProfilePicDialogData {
    profilePicChangeEvent: File;
    currentProfilePic: IProfilePic | null;
    charId: number;
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

    imageChangedEvent: any = '';
    croppedImage: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};

    ngOnInit(): void {
        this.imageChangedEvent = this.data.profilePicChangeEvent;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        console.log(event, base64ToFile(event.base64 as string));
    }

    imageLoaded() {
        this.showCropper = true;
        console.log('Image loaded');
    }

    cropperReady(sourceImageDimensions: Dimensions) {
        console.log('Cropper ready', sourceImageDimensions);
    }

    loadImageFailed() {
        console.log('Load failed');
    }

    updateRotation() {
        this.transform = {
            ...this.transform,
            rotate: this.rotation,
        };
    }
}
