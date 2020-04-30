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

  @ViewChild('newProfilePic') newProfilePic;


  profilePicForMain: IProfilePic | null = null;
  imagesListForMain: IImageForMain[] | null = null;


  newProfilePicForm = new FormGroup({
    profilePic: new FormControl()
  });


  constructor(
    private _toastrService: ToastrService,
    private _characterService: CharactersService,
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
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
    this._toastrService.warning('Aby usunąć wybrany element, naciśnij dwa razy.');
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
          this._toastrService.success('Udało się usunąć zdjęcie!');
          this.getCharacterImages();
        }, err => {
          this._toastrService.error(err?.error);
        })
    );

  }

  handleFileInput(files: FileList, multiple: boolean) {
    multiple ? this.images = files : this.profilePic = files.item(0);
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
          this._toastrService.success('Udało się zmienić zdjęcia dla postaci!');
          this.getCharacterImages();
        },
          err => {
            if (err?.error) {
              this._toastrService.error(err.error);
            }
          })
    );
  }

  changeImageName(imageId: number, imageElement: HTMLElement) {

    if (!imageElement.isContentEditable) {
      imageElement.setAttribute('contentEditable', 'true');
      imageElement.classList.add('profile-pic-name--editable');

      this._toastrService.info('Aby zapisać zmianę, naciśnij jeszcze raz na ikonkę edycji.');
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
              this._toastrService.success('Udało się zmienić nazwę zdjęcia!');
              this.getCharacterImages();
            }, err => {
              this._toastrService.error(err?.error);
            })
        );
      } else {
        this._toastrService.warning('Nazwa obrazka nie może być pusta.');
      }
    }
  }

}
