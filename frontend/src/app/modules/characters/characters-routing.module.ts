import { CharactersListComponent } from './components/characters-article/components/characters-list/characters-list.component';
import { CharactersIndexComponent } from './characters-index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterCardComponent } from './components/characters-article/components/character-card/character-card.component';

const routes: Routes = [
    {
        path: '',
        component: CharactersIndexComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: CharactersListComponent,
            },
            {
                path: ':id',
                component: CharacterCardComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CharactersRoutingModule {}
