import { LoaderComponent } from './components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { NulledPipe } from './pipes/nulled.pipe';
import { SanitizerPipe } from './pipes/sanitizer.pipe';

@NgModule({
  declarations: [
    IconComponent,
    LoaderComponent,
    NulledPipe,
    SanitizerPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IconComponent,
    NulledPipe,
    SanitizerPipe,
    LoaderComponent
  ]
})
export class SharedModule { }
