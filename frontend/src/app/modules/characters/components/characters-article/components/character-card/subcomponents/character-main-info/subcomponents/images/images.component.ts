import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { EditImageName } from 'src/app/modules/admin-panel/models/images/edit-image-name.model';
import { IProfilePic } from 'src/app/modules/admin-panel/models/images/profile-pic.model';
import { Character } from 'src/app/modules/characters/models/character.model';
import { IImageForMain } from 'src/app/modules/characters/models/image-for-main.model';

@Component({
    selector: 'app-images [character] [isUserLogged] [bgColor]',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
})
export class ImagesComponent extends BaseComponent implements OnInit {
    @Input() character: Character | null = null;
    @Input() isUserLogged: boolean = false;
    @Input('bgColor') bgColor2: Character | null = null;

    @Output() imagesHaveChangedEvent = new EventEmitter<true>();

    @ViewChild('newProfilePic') newProfilePic = null;

    profilePic: File | null = null;
    images: FileList | null = null;

    isFileModeAddToggled = false;
    isProfilePicChosen = false;

    profilePicForMain: IProfilePic | null = null;
    imagesListForMain: IImageForMain[] | null = null;

    filesListNumber = 0;
    param = { num: 0 };

    newProfilePicForm = new FormGroup({
        profilePic: new FormControl(),
    });

    imgURLList: any[] = [];

    imageIdToChange: number = 0;

    currentImageIndex = 0;

    changeImageNameForm = new FormGroup({
        name: new FormControl(''),
    });

    constructor(
        private _toastrService: ToastrService,
        private _characterService: CharactersService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit(): void {}

    setImage(imageIndex: number) {
        this.currentImageIndex = imageIndex;
    }
    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );
        const ids = event.container.data.map(
            (x) => (x as unknown as IImageForMain).id
        );
        this.changeImagesOrder(ids);
        this.imagesHaveChangedEvent.emit(true);
    }

    handleFileInput(files: FileList, multiple: boolean) {
        multiple ? (this.images = files) : (this.profilePic = files.item(0));

        !multiple && files[0]
            ? (this.isProfilePicChosen = true)
            : (this.isProfilePicChosen = false);
        if (multiple) {
            this.filesListNumber = files.length;
            this.param.num = files.length;
        }
    }

    insertDeleteInfo() {
        this._toastrService.warning(
            this._translate.instant('TOASTR_MESSAGE.DELETE_INFO')
        );
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
                .postEditImages(formData, this.character!.externalId)
                .subscribe(
                    (_) => {
                        this._toastrService.success(
                            this._translate.instant(
                                'TOASTR_MESSAGE.SAVE_SUCCESS'
                            )
                        );
                        this.imagesHaveChangedEvent.emit(true);

                        this.imgURLList = [];
                        this.filesListNumber = 0;
                        this.isProfilePicChosen = false;
                    },
                    (err) => {
                        this._toastrService.error(
                            this._translate.instant('TOASTR_MESSAGE.ERROR')
                        );
                    }
                )
        );
    }

    setChangeImageMode(image: IImageForMain) {
        this.imageIdToChange = image.id;
        this.changeImageNameForm.get('name')?.setValue(image.name);
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

    deleteCharacterImage(imageId: number) {
        this.subscriptions$.add(
            this._characterService.deleteImage(imageId).subscribe(
                (_) => {
                    this._toastrService.success(
                        this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                    );

                    this.imagesHaveChangedEvent.emit(true);
                },
                (err) => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                }
            )
        );
    }

    cancelEditMode() {
        this.imageIdToChange = 0;
    }

    changeImageName() {
        const objToSend = new EditImageName();
        objToSend.id = this.imageIdToChange;
        objToSend.name = this.changeImageNameForm.get('name')?.value;

        this.subscriptions$.add(
            this._characterService
                .patchImageName(objToSend)
                .pipe(finalize(() => {}))
                .subscribe(
                    (_) => {
                        this._toastrService.success(
                            this._translate.instant(
                                'TOASTR_MESSAGE.SAVE_SUCCESS'
                            )
                        );
                        this.imagesHaveChangedEvent.emit(true);
                    },
                    (err) => {
                        this._toastrService.error(
                            this._translate.instant('TOASTR_MESSAGE.ERROR')
                        );
                    }
                )
        );
    }

    changeImagesOrder(ids: number[]) {
        this.subscriptions$.add(
            this._characterService
                .patchImagesOrder(ids)
                .pipe(finalize(() => {}))
                .subscribe(
                    (_) => {
                        this._toastrService.success(
                            this._translate.instant(
                                'TOASTR_MESSAGE.SAVE_SUCCESS'
                            )
                        );
                        this.imagesHaveChangedEvent.emit(true);
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
