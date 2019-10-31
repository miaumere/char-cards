import { NgModule } from '@angular/core';
import { PagesComponent } from './components/pages/pages.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    PagesRoutingModule
  ]
})
export class PagesModule { }
