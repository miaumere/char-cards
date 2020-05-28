import { IGenderStatistics } from './gender-statistics.model';
import { INationalitiesStatistics } from './nationalities-statistics.model';

export interface IStatistics {
  genderStatistics: IGenderStatistics;
  nationalitiesStatistics: INationalitiesStatistics[];
}
