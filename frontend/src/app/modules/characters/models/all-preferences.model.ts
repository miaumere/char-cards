import { IHistoricalPreference } from './historical-preference.model';

export interface IAllPreferences {
  relCharacterId: number;
  relCharacterName: string;
  relCharacterSurname: string;
  preferences: IHistoricalPreference[];
}

export class AllPreferences implements IAllPreferences {
  relCharacterId: number;
  relCharacterName: string;
  relCharacterSurname: string;
  preferences: IHistoricalPreference[];

  constructor(initialValues: IAllPreferences) {
    Object.assign(this, initialValues);
  }
}
