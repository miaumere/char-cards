import { finalize } from 'rxjs/operators';
import { LoaderService } from './../service/loader.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreInterceptorService implements HttpInterceptor {

  constructor(private _loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._loaderService.show();

    return next.handle(request).pipe(
      finalize(() => {
        this._loaderService.hide();
      })
    );
  }

}
