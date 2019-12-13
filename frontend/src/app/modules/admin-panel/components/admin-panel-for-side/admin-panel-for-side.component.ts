import { SideCharactersService } from 'src/app/core/service/side-characters.service';
import { SideCharacterForListItem } from './../../../side-characters/models/side-characters.model';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-panel-for-side',
  templateUrl: './admin-panel-for-side.component.html',
  styleUrls: ['./admin-panel-for-side.component.scss']
})
export class AdminPanelForSideComponent implements OnInit {
  readonly profilePicURL = '/side-character-profile-pics';

  loading = true;
  sideChars: SideCharacterForListItem[];
  constructor(private _sideCharactersService: SideCharactersService) { }

  ngOnInit() {
    this.getAllSideCharacters();
  }

  getAllSideCharacters() {
    this.loading = true;
    this._sideCharactersService.
      getAllSideCharacters()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(sideChars => {
        this.sideChars = sideChars;
      }
      )
  }

}
