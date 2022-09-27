import { EditStoryPanelComponent } from './components/edit-story-panel/edit-story-panel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditStoryMenuComponent } from './components/edit-story-panel/edit-story-menu/edit-story-menu.component';
import { ChaptersComponent } from '../pages/components/pages/chapters/chapters.component';

const routes: Routes = [
    {
        path: '',
        component: EditStoryPanelComponent,
        children: [
            {
                path: '',
                component: EditStoryMenuComponent,
            },
            {
                path: 'edit-chapters',
                component: ChaptersComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditStoryPanelRoutingModule {}
