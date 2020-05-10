import { EditStoryPanelComponent } from './components/edit-story-panel/edit-story-panel.component';
import { NgModule } from '@angular/core'; import { RouterModule, Routes } from '@angular/router';
import { EditStoryMenuComponent } from './components/edit-story-panel/edit-story-menu/edit-story-menu.component';
import { EditChaptersMenuComponent } from './components/edit-story-panel/edit-chapters-menu/edit-chapters-menu.component';
import { EditPagesMenuComponent } from './components/edit-story-panel/edit-chapters-menu/edit-pages-menu/edit-pages-menu.component';
import { EditChaptersListMenuComponent } from './components/edit-story-panel/edit-chapters-menu/edit-chapters-list/edit-chapters-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditStoryPanelComponent,
    children: [
      {
        path: '',
        component: EditStoryMenuComponent
      },
      {
        path: 'edit-chapters',
        component: EditChaptersMenuComponent,
        children: [
          {
            path: '',
            component: EditChaptersListMenuComponent
          },
          {
            path: 'edit-pages',
            component: EditPagesMenuComponent
          }

        ]
      }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditStoryPanelRoutingModule { }
