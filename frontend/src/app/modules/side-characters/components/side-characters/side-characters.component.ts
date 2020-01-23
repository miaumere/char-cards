import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { SideCharactersService } from 'src/app/core/service/side-characters.service';
import { SideCharacter } from 'src/app/modules/side-characters/models/side-characters.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-side-characters',
  templateUrl: './side-characters.component.html',
  styleUrls: ['./side-characters.component.scss']
})
export class SideCharactersComponent extends BaseComponent implements OnInit {
  sideCharacters: SideCharacter[];
  loading = true;

  constructor(private _sideCharactersService: SideCharactersService) {
    super();
  }

  ngOnInit() {
    this.getSideCharacters();
  }

  getSideCharacters() {
    this._sideCharactersService
      .getSideCharacters()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(sideCharacters => {
        this.sideCharacters = sideCharacters;
        this.loading = false;
      });
  }

}
