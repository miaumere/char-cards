import { NationalitiesChartComponent } from './components/statistics/charts/nationalities-chart/nationalities-chart.component';
import { StatisticsService } from './../../core/service/statistics.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { GenderChartComponent } from './components/statistics/charts/gender-chart/gender-chart.component';
import { MatCardModule } from '@angular/material/card';
import { TypeChartComponent } from './components/statistics/charts/type-chart/type-chart.component';


@NgModule({
  declarations: [
    StatisticsComponent,
    GenderChartComponent,
    NationalitiesChartComponent,
    TypeChartComponent
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
