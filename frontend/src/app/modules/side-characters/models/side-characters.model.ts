import { ProfilePic } from '../../admin-panel/models/profile-pic.model';

export class SideCharacter {
	externalId: number;
	sideCharacterName: string;
	sideCharacterSurname: string;
	sideCharacterDesc: string;
}

export class SideCharacterForListItem {
	externalId: number;
	sideCharacterName: string;
	sideCharacterSurname: string;
	archived: boolean;
	profilePic: ProfilePic;
}
