import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SideCharactersComponent } from './components/side-characters/side-characters.component';
import { SideCharactersRoutingModule } from './side-characters-routing.module';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';

@NgModule({
  declarations: [
    SideCharactersComponent,
    IconComponent
  ],
  imports: [
    SideCharactersRoutingModule,
    CommonModule
  ]
})
export class SideCharactersModule { }
