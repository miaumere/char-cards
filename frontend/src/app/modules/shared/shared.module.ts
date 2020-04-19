import { LoaderComponent } from './components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { NulledPipe } from './pipes/nulled.pipe';
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { EnumValPipe } from './pipes/enum-values.pipe';

const sharedDeclarations = [
  IconComponent,
  LoaderComponent,
  NulledPipe,
  SanitizerPipe,
  EnumValPipe
]

@NgModule({
  declarations: [
    ...sharedDeclarations
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...sharedDeclarations
  ]
})
export class SharedModule { }

