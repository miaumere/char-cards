import { BaseComponent } from 'src/app/core/base.component';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';

@Directive({
    selector: '[appIfLoggedUser]',
})
export class IfLoggedUserDirective
    extends BaseComponent
    implements AfterViewInit
{
    constructor(
        private view: ViewContainerRef,
        private template: TemplateRef<any>,
        private _authService: AuthService
    ) {
        super();
    }

    ngAfterViewInit() {
        this.subscriptions$.add(
            this._authService.loggedUser$.subscribe((loggedUser) => {
                if (loggedUser) {
                    this.view.createEmbeddedView(this.template);
                } else {
                    this.view.remove();
                }
            })
        );
    }
}
