import { Component, Input, OnInit } from '@angular/core';
import { IProfilePic } from 'src/app/modules/admin-panel/models/images/profile-pic.model';
import { Character } from 'src/app/modules/characters/models/character.model';

@Component({
    selector: 'app-profile-pic [profilePic]',
    templateUrl: './profile-pic.component.html',
    styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent implements OnInit {
    @Input() profilePic: IProfilePic | null = null;
    constructor() {}

    ngOnInit(): void {}
}
