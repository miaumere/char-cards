import { CharacterRelationsComponent } from './components/character-relations/character-relations.component';
import { CharacterModifyComponent } from './components/character-modify/character-modify.component';

import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminPanelForCharactersComponent } from './components/admin-panel-for-characters/admin-panel-for-characters.component';
import { CharacterPreferencesComponent } from './components/character-preferences/character-preferences.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AdminPanelForCharactersComponent,
    },
    {
        path: 'character-modify/:type',
        component: CharacterModifyComponent,
    },
    {
        path: 'character-relations/:type',
        component: CharacterRelationsComponent,
    },
    {
        path: 'panel',
        component: AdminPanelComponent,
        children: [
            {
                path: 'character-modify/:type',
                component: CharacterModifyComponent,
            },

            {
                path: 'character-relations/:type',
                component: CharacterRelationsComponent,
            },
            {
                path: 'character-preferences',
                component: CharacterPreferencesComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
