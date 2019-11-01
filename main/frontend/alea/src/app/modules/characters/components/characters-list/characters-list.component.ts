import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/core/service/characters.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  constructor(private _charactersService: CharactersService) { }

  ngOnInit() {
    this._charactersService.charList$
      .subscribe(response => {
        console.log("ODPOWIEDZ: ", response)
      });
  }

}
