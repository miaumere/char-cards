import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SideCharactersComponent } from './components/side-characters/side-characters.component';
import { SideCharactersRoutingModule } from './side-characters-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SideCharactersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    SideCharactersRoutingModule
  ]
})
export class SideCharactersModule { }
