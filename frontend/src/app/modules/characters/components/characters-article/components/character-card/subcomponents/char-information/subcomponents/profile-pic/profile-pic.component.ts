import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
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
    @Input('profilePic') profilePicFromCharacter: string | null = null;
    @Input() isUserLogged: boolean = false;
    @Input() charId: number = 0;
    @Input() height: string = '100px';
    @Input() isCircle = false;

    @Output() profilePicChangedEvent = new EventEmitter<true>();

    images: FileList | null = null;
    imgURLList: any[] = [];

    filesListNumber = 0;

    isProfilePicChosen = false;
    profilePic: File | undefined;

    constructor(public dialog: MatDialog) {
        super();
    }

    ngOnInit(): void {}

    handleFileInput(event: any) {
        this.profilePic = event.target.files.item(0) as File;
        this.isProfilePicChosen = true;
        this.openCropImageDialog(event);
    }

    openCropImageDialog(event: any) {
        const data: CropProfilePicDialogData = {
            profilePicChangeEvent: event,
            currentProfilePic: this.profilePicFromCharacter,
            charId: this.charId,
        };
        this.dialog
            .open(CropProfilePicComponent, {
                data,
            })
            .afterClosed()
            .subscribe((shouldReloadProfilePic: boolean) => {
                if (!!shouldReloadProfilePic) {
                    this.profilePicChangedEvent.emit();
                }
                this.isProfilePicChosen = false;
                this.imgURLList = [];
            });
    }
}
