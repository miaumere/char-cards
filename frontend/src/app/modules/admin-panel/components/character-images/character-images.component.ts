import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { finalize } from 'rxjs/operators';
import { EditImageName } from '../../models/images/edit-image-name.model';
import { IProfilePic } from '../../models/images/profile-pic.model';
import { IImageForMain } from 'src/app/modules/characters/models/image-for-main.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-character-images',
  templateUrl: './character-images.component.html',
  styleUrls: ['./character-images.component.scss']
})

export class CharacterImagesComponent extends BaseComponent implements OnInit {
  loading = true;

  charId: number;

  profilePic: File | null = null;
  images: FileList | null = null;

  isProfilePicChosen = false;

  @ViewChild('newProfilePic') newProfilePic;

  profilePicForMain: IProfilePic | null = null;
  imagesListForMain: IImageForMain[] | null = null;

  filesListNumber = 0;
  param = { num: 0 };

  newProfilePicForm = new FormGroup({
    profilePic: new FormControl()
  });

  imgURLList: any[] = [];

  constructor(
    private _toastrService: ToastrService,
    private _characterService: CharactersService,
    private _activatedRoute: ActivatedRoute,
    private _translate: TranslateService
  ) { super(); }

  ngOnInit() {
    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
        this.charId = +queryParam.id;
      });

    this.getCharacterImages();

  }

  getCharacterImages() {
    this.subscriptions$.add(
      this._characterService
        .getCharacters()
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(characters => {
          const foundCharacter = characters.find(x => x.id === this.charId);
          if (foundCharacter?.profilePic) {

            this.profilePicForMain = foundCharacter?.profilePic;
          }

          // this.profilePicForMain = character[0]?.profilePic;
        })
    );
    this.subscriptions$.add(
      this._characterService
        .getCharacterById(this.charId)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(character => {
          this.imagesListForMain = character.imagesList;
        }
        )
    );

  }

  insertDeleteInfo() {
    this._toastrService.warning(this._translate.instant('TOASTR_MESSAGE.DELETE_INFO'));
  }

  deleteCharacterImage(imageId: number) {
    this.loading = true;

    this.subscriptions$.add(
      this._characterService
        .deleteImage(imageId)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(_ => {
          this._toastrService.success(this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS'));
          this.getCharacterImages();
        }, err => {
          this._toastrService.error(this._translate.instant('TOASTR_MESSAGE.ERROR'));
        })
    );

  }

  handleFileInput(files: FileList, multiple: boolean) {
    multiple ? this.images = files : this.profilePic = files.item(0);

    !multiple && files[0] ? this.isProfilePicChosen = true : this.isProfilePicChosen = false;
    if (multiple) {
      this.filesListNumber = files.length;
      this.param.num = files.length;
    }
  }

  preview(files: FileList) {
    this.imgURLList = [];
    if (files.length === 0) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = e => {
        this.imgURLList.push(reader.result);
      }

    }

  }


  setNewImages() {
    this.loading = true;

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
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(_ => {
          this._toastrService.success(this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS'));
          this.getCharacterImages();
          this.imgURLList = [];
          this.filesListNumber = 0;
          this.isProfilePicChosen = false;
        },
          err => {
            this._toastrService.error(this._translate.instant('TOASTR_MESSAGE.ERROR'))
          })
    );
  }

  changeImageName(imageId: number, imageElement: HTMLElement) {

    if (!imageElement.isContentEditable) {
      imageElement.setAttribute('contentEditable', 'true');
      imageElement.classList.add('profile-pic-name--editable');

      this._toastrService.info(this._translate.instant('TOASTR_MESSAGE.DBLCLICK_INFO'));
    } else {
      if (imageElement.textContent) {
        const objToSend = new EditImageName();
        objToSend.id = imageId;
        objToSend.name = imageElement.textContent;
        this.subscriptions$.add(
          this._characterService
            .patchImageName(objToSend)
            .pipe(
              finalize(() => {
                this.loading = false;
              })
            ).subscribe(_ => {
              this._toastrService.success(this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS'));
              this.getCharacterImages();
            }, err => {
              this._toastrService.error(this._translate.instant('TOASTR_MESSAGE.ERROR'));
            })
        );
      } else {
        this._toastrService.warning(this._translate.instant('TOASTR_MESSAGE.IMG_NAME_WARN'));
      }
    }
  }

}
