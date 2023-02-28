import { BaseComponent } from 'src/app/core/base.component';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { UserService } from 'src/app/core/service/user.service';

@Directive({
    selector: '[appIfLoggedUser]',
})
export class IfLoggedUserDirective
    extends BaseComponent
    implements AfterViewInit
{
    condition: boolean = true;

    constructor(
        private view: ViewContainerRef,
        private template: TemplateRef<any>,
        private _authService: UserService
    ) {
        super();
    }

    @Input() set appIfLoggedUser(condition: boolean) {
        this.condition = condition;
    }

    ngAfterViewInit(): void {
        this.subscriptions$.add(
            this._authService.user$.subscribe((loggedUser) => {
                if (loggedUser || !this.condition) {
                    this.view.createEmbeddedView(this.template);
                } else {
                    this.view.remove();
                }
            })
        );
    }
}
