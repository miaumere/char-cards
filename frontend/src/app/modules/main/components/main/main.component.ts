import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'd3';
import {
    ICharacterItem,
    CharacterItem,
} from 'src/app/modules/characters/models/character-item.model';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    constructor(private http: HttpClient) {}

    ngOnInit() {
        let root = document.documentElement;
        root.style.setProperty('--theme-color', 'white');

        this.getCharacters();
    }

    getCharacters() {
        return this.http
            .get<ICharacterItem[]>('/api/WeatherForecast')
            .subscribe((weather) => {
                console.log('weather: ', weather);
            });
    }
}
