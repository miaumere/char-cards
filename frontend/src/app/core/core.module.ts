import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../modules/shared/shared.module';

@NgModule({
	declarations: [
		NavbarComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule
	],
	exports: [
		NavbarComponent
	]
})
export class CoreModule { }
