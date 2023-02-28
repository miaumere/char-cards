import { AdminPermissionsResolver } from './core/resolvers/admin-permissions.resolver';
import { CoreInterceptorService } from './core/interceptors/core-interceptor.service';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
    HttpClientModule,
    HttpClient,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
    HashLocationStrategy,
    LocationStrategy,
    CommonModule,
} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import {
    TranslateModule,
    TranslateLoader,
    TranslateService,
} from '@ngx-translate/core';

import { AppComponent } from './app.component';

import { CharactersModule } from './modules/characters/characters.module';
import { PagesModule } from './modules/pages/pages.module';
import { MainModule } from './modules/main/main.module';
import { LoginModule } from './modules/login/login.module';
import { SharedModule } from './modules/shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export function initApp(translate: TranslateService) {
    return () => {
        return new Promise<void>((resolve) => {
            document.documentElement.style.setProperty(
                '--theme-color',
                'white'
            );

            const chosenLanguage = localStorage.getItem('language');

            if (chosenLanguage) {
                translate.use(chosenLanguage);
            } else {
                translate.use('en');
            }
            resolve();
        });
    };
}
@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ToastrModule.forRoot({
            preventDuplicates: true,
        }),
        HttpClientModule,
        MainModule,
        PagesModule,
        CharactersModule,
        LoginModule,
        SharedModule,
        MatMenuModule,
        CoreModule,
        RouterModule,
        MatSliderModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [
        HttpClientModule,
        AdminPermissionsResolver,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CoreInterceptorService,
            multi: true,
        },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initApp,
            multi: true,
            deps: [TranslateService],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
