import { LoaderComponent } from './components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { NulledPipe } from './pipes/nulled.pipe';
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { EnumValPipe } from './pipes/enum-values.pipe';
import { BookIconComponent } from './components/book-icon/book-icon.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GenderIconColorPipe } from './pipes/gender-icon-color';
import { DividerComponent } from './components/divider/divider.component';
import { MatDividerModule } from '@angular/material/divider';
import { EditIconComponent } from './components/edit-icon/edit-icon.component';

const pipes = [NulledPipe, SanitizerPipe, EnumValPipe, GenderIconColorPipe];

const sharedDeclarations = [
    IconComponent,
    BookIconComponent,
    LoaderComponent,
    DividerComponent,
    EditIconComponent,
    ...pipes,
];

@NgModule({
    declarations: [...sharedDeclarations],
    imports: [
        CommonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDividerModule,
    ],
    exports: [...sharedDeclarations],
})
export class SharedModule {}
