import { IAgeStat } from './age-stat.model';

export interface IAgeStatistics {
  ageStats: IAgeStat[];
  undefinedAges: number;
}
