import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
    mockData: { id: number; name: string; color: string }[] = [
        { id: 1, name: '🪐 Planeta', color: 'crimson' },
        {
            id: 2,
            name: '🌱 Inny tag',
            color: 'tomato',
        },
    ];

    tags: { id: number; name: string; color: string }[] = [];

    constructor() {}

    ngOnInit(): void {
        this.tags = this.mockData;
    }
}
