import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharactersComponent } from './components/characters/characters.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersMenuComponent } from './components/characters-menu/characters-menu.component';
import { CharactersIndexComponent } from './characters-index.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharactersService } from 'src/app/core/service/characters.service';

@NgModule({
  declarations: [CharactersComponent, CharactersMenuComponent, CharactersIndexComponent, CharactersListComponent],
  imports: [
    CommonModule,
    CharactersRoutingModule
  ],
  providers: []
})
export class CharactersModule { }
