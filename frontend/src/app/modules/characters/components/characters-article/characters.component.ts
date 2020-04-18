import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent extends BaseComponent implements OnInit {
  childBackground = '';
  bgUrl = `url(
    data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAF0lEQVQYV2NkQAJSN+83PFNXbGCkgSAAqjkUBj+3UZ0AAAAASUVORK5CYII=
    )`

  ngOnInit() {

  }

  bgColorFromChild(bgColor: string) {
    this.childBackground = bgColor ? bgColor : 'grey';
  }


}
