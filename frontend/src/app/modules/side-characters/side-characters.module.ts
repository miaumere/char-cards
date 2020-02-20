import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SideCharactersComponent } from './components/side-characters/side-characters.component';
import { SideCharactersRoutingModule } from './side-characters-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
	declarations: [
		SideCharactersComponent
	],
	imports: [
		SideCharactersRoutingModule,
		CommonModule,
		SharedModule
	]
})
export class SideCharactersModule { }
