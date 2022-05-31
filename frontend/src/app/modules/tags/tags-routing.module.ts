import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsIndexComponent } from './components/edit-tags/tags-index-component.component';
import { TagsEditPanelComponent } from './components/edit-tags/subcomponents/tags-edit-panel/tags-edit-panel.component';

const routes: Routes = [
    {
        path: '',
        component: TagsIndexComponent,
        children: [
            {
                path: '',
                component: TagsEditPanelComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TagsRoutingModule {}
