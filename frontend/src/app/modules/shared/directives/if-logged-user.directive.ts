import { Directive } from '@angular/core';

@Directive({
    selector: '[appIfLoggedUser]',
})
export class IfLoggedUserDirective {
    constructor() {
        console.log('appIfLoggedUser');
    }
}
