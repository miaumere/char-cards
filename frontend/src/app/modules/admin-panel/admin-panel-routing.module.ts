import { CharacterModifyComponent } from './components/character-modify/character-modify.component';

import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminPanelForCharactersComponent } from './components/admin-panel-for-characters/admin-panel-for-characters.component';

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
        path: 'panel',
        component: AdminPanelComponent,
        children: [
            {
                path: 'character-modify/:type',
                component: CharacterModifyComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
