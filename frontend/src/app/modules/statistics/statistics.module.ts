import { StatisticsService } from './../../core/service/statistics.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { GenderChartComponent } from './components/statistics/charts/gender-chart.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    StatisticsComponent,
    GenderChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StatisticsRoutingModule,
    MatCardModule
  ],
  providers: [
    StatisticsService
  ]
})
export class StatisticsModule { }
