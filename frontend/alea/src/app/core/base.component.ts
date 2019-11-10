import { Subject, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export abstract class BaseComponent implements OnDestroy {

  protected subscriptions$ = new Subscription();

  constructor() {
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
