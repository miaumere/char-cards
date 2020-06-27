import { LoaderService } from './core/service/loader.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  globalLoaderIsVisible = false;

  constructor(private _loaderService: LoaderService) { }

  ngOnInit(): void {
    this._loaderService.isLoaderVisible.subscribe(isVisible => {
      this.globalLoaderIsVisible = isVisible;
    })
  }

}

