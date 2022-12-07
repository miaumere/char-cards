import { CharacterFashionComponent } from './components/characters-article/components/character-card/subcomponents/character-fashion/character-fashion.component';
import { CharInformationComponent } from './components/characters-article/components/character-card/subcomponents/char-information/char-information.component';
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
                children: [
                    {
                        path: '',
                        component: CharInformationComponent,
                    },
                    {
                        path: 'child-a',
                        component: CharacterFashionComponent,
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CharactersRoutingModule {}
