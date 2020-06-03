import { IStatistics } from './../../modules/statistics/models/statistics.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private readonly statisticsControllerURL = '/api/statistics';

  private readonly getStatisticsURL = `${this.statisticsControllerURL}/get-main-statistics`;

  constructor(private http: HttpClient) {
  }

  getStatistics() {
    return this.http.get<IStatistics>(this.getStatisticsURL);
  }

}
