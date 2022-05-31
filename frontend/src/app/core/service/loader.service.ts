import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _isLoaderVisible = new BehaviorSubject<boolean>(false);
  private _loadersTable: number[] = [];


  get isLoaderVisible() {
    return this._isLoaderVisible
  }

  show() {
    this._isLoaderVisible.next(true)
    this._loadersTable.push(1);
  }

  hide() {
    this._loadersTable.pop();

    if (this._loadersTable.length === 0) {
      this._isLoaderVisible.next(false)
    }
  }

  constructor() { }


}
