import { IHistoricalPreference } from './historical-preference.model';

export interface IAllPreferences {
    characterId: number;
    characterFullname: string;
    preferences: IHistoricalPreference[];
    backwardPreferences: IHistoricalPreference[];
}

export class AllPreferences implements IAllPreferences {
    characterId: number = 0;
    characterFullname: string = '';

    preferences: IHistoricalPreference[] = [];
    backwardPreferences: IHistoricalPreference[] = [];

    constructor(initialValues: IAllPreferences) {
        Object.assign(this, initialValues);
    }
}
