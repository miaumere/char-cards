import { NgModule } from '@angular/core';
import { SideCharactersComponent } from './components/side-characters/side-characters.component';
import { SideCharactersRoutingModule } from './side-characters-routing.module';

@NgModule({
  declarations: [SideCharactersComponent],
  imports: [
    SideCharactersRoutingModule
  ]
})
export class SideCharactersModule { }
