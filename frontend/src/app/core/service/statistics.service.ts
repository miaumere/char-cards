import { IStatistics } from './../../modules/statistics/models/statistics.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICharacterPreferences, CharacterPreferences } from 'src/app/modules/characters/models/character-preferences.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private readonly statisticsControllerURL = '/api/statistics';

  private readonly getStatisticsURL = `${this.statisticsControllerURL}/get-main-statistics`;
  private readonly getPreferencesForCharacterURL = `${this.statisticsControllerURL}/get-preferences-for-char`;


  constructor(private http: HttpClient) {
  }

  getStatistics() {
    return this.http.get<IStatistics>(this.getStatisticsURL);
  }

  getPreferencesForCharacter(id: number) {
    const params = new HttpParams().set('id', '' + id);
    return this.http.get<ICharacterPreferences[]>(this.getPreferencesForCharacterURL, { params })
      .pipe(
        map(response => {
          const mappedResponse = response.map(r => new CharacterPreferences(r));
          return mappedResponse;
        })
      );

  }

}
