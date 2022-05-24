import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPermissionsGuard } from './core/guards/admin-permissions-guard.service';

const routes: Routes = [
    {
        path: 'main',
        loadChildren: () =>
            import('./modules/main/main.module').then((m) => m.MainModule),
    },
    {
        path: 'char-cards',
        loadChildren: () =>
            import('./modules/characters/characters.module').then(
                (m) => m.CharactersModule
            ),
    },
    {
        path: 'pages',
        loadChildren: () =>
            import('./modules/pages/pages.module').then((m) => m.PagesModule),
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./modules/login/login.module').then((m) => m.LoginModule),
    },
    {
        path: 'admin-panel',
        canActivate: [AdminPermissionsGuard],
        loadChildren: () =>
            import('./modules/admin-panel/admin-panel.module').then(
                (m) => m.AdminPanelModule
            ),
    },
    {
        path: 'edit-story-panel',
        // canActivate: [AdminPermissionsGuard],
        loadChildren: () =>
            import('./modules/edit-story-panel/edit-story-panel.module').then(
                (m) => m.EditStoryPanelModule
            ),
    },
    // {
    //   path: 'statistics',
    //   loadChildren: () => import('./modules/statistics/statistics.module').then(m => m.StatisticsModule)
    // }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
