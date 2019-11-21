import { LoaderComponent } from './components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { NulledPipe } from './pipes/nulled.pipe';

@NgModule({
  declarations: [
    IconComponent,
    LoaderComponent,
    NulledPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IconComponent,
    NulledPipe,
    LoaderComponent
  ]
})
export class SharedModule { }
