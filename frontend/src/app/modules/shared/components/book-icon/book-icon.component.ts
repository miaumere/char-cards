import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/modules/pages/models/books/book.model';
import * as tinycolor from 'tinycolor2';

@Component({
    selector: 'app-book-icon [book]',
    templateUrl: './book-icon.component.html',
    styleUrls: ['./book-icon.component.scss'],
})
export class BookIconComponent implements OnInit {
    @Input() size = '';
    @Input() number?: number;

    @Input() book!: Book;

    numberFontColor = 'black';

    // Przykładowe zastosowanie komponentu:
    // <app-book-icon  [book]="book" [size]='4' [number]='4'></app-book-icon>

    ngOnInit() {
        if (this.size) {
            this.size = 'scale(' + this.size + ')';
        }
        if (this.book?.color) {
            const bookColor = tinycolor(this.book.color);
            if (bookColor.isLight()) {
                this.numberFontColor = 'black';
            } else {
                this.numberFontColor = 'white';
            }
        }
    }
}
