import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Character } from 'src/app/model/characters/character.model';
import { CharactersService } from 'src/app/core/service/characters.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent extends BaseComponent implements OnInit {

  @Output() bgColorFromChild = new EventEmitter<string>();

  routeId: number | null = null;
  character: Character | null = null;
  characterProfilePicURL: string;
  currentImageIndex = 0;

  loading = true;
  constructor(
    private _charactersService: CharactersService,
    private _route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    // FIXME tutaj ten ... sub

    this._route.params.subscribe(route => {

      // console.log("route zmienia sie", route.id);
      this.routeId = route.id;
      this.characterProfilePicURL = `/characters-images/${this.routeId}`;
      this.currentImageIndex = 0;
      this.getCharacterById();

    })

  }

  getCharacterById() {
    this.character = null;

    // FIXME Sub
    if (this.routeId !== null) {
      this._charactersService.getCharacterById(this.routeId)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(character => {
          this.character = character;
          this.bgColorFromChild.emit(character.colors.themeColor1);
        });
    }
  }

  setImage(imageIndex: number) {
    // console.log(imageIndex);
    this.currentImageIndex = imageIndex;
  }


}
