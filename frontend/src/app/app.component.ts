import { LoaderService } from './core/service/loader.service';
import { Component, OnInit, AfterContentInit, AfterViewChecked } from '@angular/core';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {

  globalLoaderIsVisible = this._loaderService.isLoaderVisible.value;

  constructor(private _loaderService: LoaderService) { }

  ngAfterViewChecked(): void {
    this._loaderService.isLoaderVisible.pipe(delay(0)).subscribe(isVisible => {
      this.globalLoaderIsVisible = isVisible;
    })
  }

}

