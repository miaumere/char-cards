import { Component, Input, OnInit } from '@angular/core';
import { Story } from 'src/app/modules/admin-panel/models/character-story/story.model';

@Component({
    selector: 'app-story [story] [color]',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
    @Input() story: Story[] = [];
    @Input() color: string = '';

    constructor() {}

    ngOnInit(): void {}
}
