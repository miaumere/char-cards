import { NgModule } from '@angular/core';
import { CharactersComponent } from './components/characters/characters.component';
import { CharactersRoutingModule } from './characters-routing.module';

@NgModule({
  declarations: [CharactersComponent],
  imports: [
    CharactersRoutingModule
  ]
})
export class CharactersModule { }
