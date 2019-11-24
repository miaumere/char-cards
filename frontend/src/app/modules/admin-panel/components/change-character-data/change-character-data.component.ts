import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-character-data',
  templateUrl: './change-character-data.component.html',
  styleUrls: ['./change-character-data.component.scss']
})
export class ChangeCharacterDataComponent implements OnInit {

  changeType: string;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {

  }

  setChangeData() {
    this._route.params.subscribe(param => {
      console.log(param);
    })
  }


}
