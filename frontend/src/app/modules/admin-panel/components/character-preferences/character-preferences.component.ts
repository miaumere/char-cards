import { ToastrService } from 'ngx-toastr';
import { CharactersService } from 'src/app/core/service/characters.service';
import { Component, OnInit, } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-preferences',
  templateUrl: './character-preferences.component.html',
  styleUrls: ['./character-preferences.component.scss']
})

export class CharacterPreferencesComponent extends BaseComponent implements OnInit {
  charId: number;


  constructor(
    private _charactersService: CharactersService,
    private _activatedRoute: ActivatedRoute,
    private _toastrService: ToastrService
  ) { super(); }

  ngOnInit() {

    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
        this.charId = +queryParam.id;
      });

  }

}
