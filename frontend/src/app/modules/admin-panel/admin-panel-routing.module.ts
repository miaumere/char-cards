import { CharacterStoriesComponent } from './components/character-stories/character-stories.component';
import { CharacterModifyComponent } from './components/character-modify/character-modify.component';

import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ChangeCharacterDataComponent } from './components/change-character-data/change-character-data.component';
import { AdminPanelForCharactersComponent } from './components/admin-panel-for-characters/admin-panel-for-characters.component';
import { CharacterQuotesComponent } from './components/character-quotes/character-quotes.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path: '',
        component: AdminPanelForCharactersComponent
      },
      {
        path: 'change/:name',
        component: ChangeCharacterDataComponent
      },
      {
        path: 'character-modify/:type',
        component: CharacterModifyComponent
      },
      {
        path: 'character-stories',
        component: CharacterStoriesComponent
      },
      {
        path: 'character-quotes',
        component: CharacterQuotesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
