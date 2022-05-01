import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { IProfilePic } from 'src/app/modules/admin-panel/models/images/profile-pic.model';
import { Character } from 'src/app/modules/characters/models/character.model';
import {
    CropProfilePicComponent,
    CropProfilePicDialogData,
} from './crop-profile-pic/crop-profile-pic.component';

@Component({
    selector: 'app-profile-pic [profilePic] [charId]',
    templateUrl: './profile-pic.component.html',
    styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent extends BaseComponent implements OnInit {
    @Input('profilePic') profilePicFromCharacter: IProfilePic | null = null;
    @Input() isUserLogged: boolean = false;
    @Input() charId: number = 0;

    @Output() profilePicChangedEvent = new EventEmitter<true>();

    images: FileList | null = null;
    imgURLList: any[] = [];

    filesListNumber = 0;

    isProfilePicChosen = false;
    profilePic: File | undefined;

    constructor(
        private _toastrService: ToastrService,
        private _characterService: CharactersService,
        private _translate: TranslateService,
        public dialog: MatDialog
    ) {
        super();
    }

    ngOnInit(): void {}

    handleFileInput(event: any) {
        this.profilePic = event.target.files.item(0) as File;
        this.isProfilePicChosen = true;
        this.openCropImageDialog(event);
    }

    setNewImages() {
        const formData = new FormData();

        if (this.profilePic) {
            formData.append('profilePic', this.profilePic);
        }
        if (this.images) {
            for (let i = 0; i < this.images.length; i++) {
                formData.append('image' + i, this.images[i]);
            }
        }

        this.subscriptions$.add(
            this._characterService
                .postEditImages(formData, this.charId)

                .subscribe(
                    (_) => {
                        this._toastrService.success(
                            this._translate.instant(
                                'TOASTR_MESSAGE.SAVE_SUCCESS'
                            )
                        );
                        this.imgURLList = [];
                        this.filesListNumber = 0;
                        this.isProfilePicChosen = false;
                        this.profilePicChangedEvent.emit();
                    },
                    (err) => {
                        this._toastrService.error(
                            this._translate.instant('TOASTR_MESSAGE.ERROR')
                        );
                    }
                )
        );
    }

    openCropImageDialog(event: any) {
        const data: CropProfilePicDialogData = {
            profilePicChangeEvent: event,
            currentProfilePic: this.profilePicFromCharacter,
            charId: this.charId,
        };
        this.dialog.open(CropProfilePicComponent, {
            data,
        });
    }
}
