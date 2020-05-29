import { IGenderStatistics } from './gender-statistics.model';
import { INationalitiesStatistics } from './nationalities-statistics.model';
import { ITypeStatistics } from './type-statistics.model';

export interface IStatistics {
  genderStatistics: IGenderStatistics;
  nationalitiesStatistics: INationalitiesStatistics[];
  typeStatistics: ITypeStatistics;
}
