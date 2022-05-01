import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { IProfilePic } from 'src/app/modules/admin-panel/models/images/profile-pic.model';
import { Character } from 'src/app/modules/characters/models/character.model';

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
    profilePic: File | null = null;

    constructor(
        private _toastrService: ToastrService,
        private _characterService: CharactersService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit(): void {}

    handleFileInput(files: FileList) {
        this.profilePic = files.item(0);
        this.isProfilePicChosen = true;
    }

    preview(files: FileList) {
        this.imgURLList = [];
        if (files.length === 0) {
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = (e) => {
                this.imgURLList.push(reader.result);
            };
        }
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
}
