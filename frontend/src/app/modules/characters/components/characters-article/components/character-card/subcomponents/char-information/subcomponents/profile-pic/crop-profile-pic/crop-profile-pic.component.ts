import { IProfilePic } from './../../../../../../../../../../admin-panel/models/images/profile-pic.model';
import { Component, Inject, OnInit } from '@angular/core';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { base64ToFile } from './image-cropper/blob.utils';
import {
    ImageTransform,
    ImageCroppedEvent,
    Dimensions,
} from './image-cropper/image-cropper.component';
import { BaseComponent } from 'src/app/core/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CharactersService } from 'src/app/core/service/characters.service';

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
export class CropProfilePicComponent extends BaseComponent implements OnInit {
    constructor(
        private _toastrService: ToastrService,
        private _characterService: CharactersService,
        private _translate: TranslateService,
        @Inject(MAT_DIALOG_DATA) public data: CropProfilePicDialogData,
        public dialogRef: MatDialogRef<CropProfilePicComponent>,
        public dialog: MatDialog
    ) {
        super();
    }

    imageChangedEvent: any = '';
    croppedImage: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};

    profilePic: File | undefined;

    ngOnInit(): void {
        this.imageChangedEvent = this.data.profilePicChangeEvent;
    }

    imageCropped(event: ImageCroppedEvent) {
        const blobToFile = (theBlob: Blob, fileName: string): File => {
            return new File([theBlob], fileName, {
                lastModified: new Date().getTime(),
                type: theBlob.type,
            });
        };

        this.croppedImage = event.base64;
        const file = base64ToFile(event.base64 as string) as File;
        const typedEvent = this.data.profilePicChangeEvent as any;

        const fileName = typedEvent.target.files[0].name;
        this.profilePic = blobToFile(file, fileName);
    }

    imageLoaded() {
        this.showCropper = true;
    }

    cropperReady(sourceImageDimensions: Dimensions) {}

    loadImageFailed() {
        console.error('Load failed');
    }

    updateRotation() {
        this.transform = {
            ...this.transform,
            rotate: this.rotation,
        };
    }

    closeDialog() {
        this.dialogRef.close(false);
    }

    saveProfilePic() {
        const formData = new FormData();
        if (this.profilePic) {
            formData.append('profilePic', this.profilePic);
        }

        this.subscriptions$.add(
            this._characterService
                .postEditImages(formData, this.data.charId)
                .subscribe(
                    (_) => {
                        this._toastrService.success(
                            this._translate.instant(
                                'TOASTR_MESSAGE.SAVE_SUCCESS'
                            )
                        );

                        this.dialogRef.close(true);
                    },
                    (err) => {
                        this._toastrService.error(
                            this._translate.instant('TOASTR_MESSAGE.ERROR')
                        );
                    }
                )
        );
    }
}
