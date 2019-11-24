import { AuthService } from './service/auth.service';
import { LoggedUser } from './../model/users/logged-user.model';
import { Subject, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { ServiceLocator } from './service-locator';

export abstract class BaseComponent implements OnDestroy {

  protected subscriptions$ = new Subscription();
  // protected authService: AuthService;

  constructor() {
    // this.authService = ServiceLocator.injector.get(AuthService);



    const onDestroyF = this.ngOnDestroy;

    this.ngOnDestroy = () => {
      this.subscriptions$.unsubscribe();
      onDestroyF.bind(this)();
    };



  }



  ngOnDestroy() {
    // WARNING - Do not use ngOnDestroy logic here! Instead add to lambda func in constructor
  }

}
