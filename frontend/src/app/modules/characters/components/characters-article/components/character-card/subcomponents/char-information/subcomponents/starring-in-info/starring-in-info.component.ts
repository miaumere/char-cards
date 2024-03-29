import {
    Component,
    Input,
    OnInit,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { StarringType } from 'src/app/modules/characters/models/starring-in/StarringType.enum';
import { BookForCharacter } from 'src/app/modules/characters/models/starring-in/book-for-character';

@Component({
    selector: 'app-starring-in-info [starringIn]',
    templateUrl: './starring-in-info.component.html',
    styleUrls: ['./starring-in-info.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class StarringInInfoComponent implements OnInit {
    readonly StarringType = StarringType;

    @Input() starringIn: BookForCharacter[] = [];

    isStarringListComputed: boolean = false;

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.starringIn) {
            const maxValue = this.starringIn.reduce((acc, value) => {
                if (acc.chapters.length > value.chapters.length) {
                    return acc;
                } else {
                    return value;
                }
            }).chapters.length;

            for (const mockItem of this.starringIn) {
                if (mockItem.chapters.length >= maxValue) {
                    continue;
                }
                const loopLength = maxValue - mockItem.chapters.length;

                for (let index = 0; index < loopLength; index++) {
                    mockItem.chapters.push({
                        chapterId: 0,
                        chapterName: '',
                        starringType: null,
                    });
                }
            }
            this.isStarringListComputed = true;
        }
    }
    ngOnInit() {}
}
