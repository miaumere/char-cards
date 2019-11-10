import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { SideCharactersService } from 'src/app/core/service/side-characters.service';
import { SideCharacter } from 'src/app/model/side-characters/side-characters.model';

@Component({
  selector: 'app-side-characters',
  templateUrl: './side-characters.component.html',
  styleUrls: ['./side-characters.component.scss']
})
export class SideCharactersComponent extends BaseComponent implements OnInit {
  sideCharacters: SideCharacter[];

  constructor(private _sideCharactersService: SideCharactersService) {
    super();
  }

  ngOnInit() {
    this.getSideCharacters();
  }

  getSideCharacters() {
    this._sideCharactersService.getSideCharacters()
      .subscribe(sideCharacters => {
        this.sideCharacters = sideCharacters;
      });
  }

}
