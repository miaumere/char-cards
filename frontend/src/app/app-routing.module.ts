import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPermissionsResolver } from './core/resolvers/admin-permissions.resolver';

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
        path: 'tags',
        resolve: [AdminPermissionsResolver],
        loadChildren: () =>
            import('./modules/tags/tags.module').then((m) => m.TagsModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
