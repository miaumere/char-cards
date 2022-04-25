import { IStatistics } from './../../models/statistics.model';
import { BaseComponent } from 'src/app/core/base.component';
import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/core/service/statistics.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent extends BaseComponent implements OnInit {
    statistics: IStatistics | null = null;

    constructor(private _statisticsService: StatisticsService) {
        super();
    }

    ngOnInit() {
        this.getStatistics();
    }

    getStatistics() {
        this.subscriptions$.add(
            this._statisticsService.getStatistics().subscribe((stats) => {
                this.statistics = stats;
            })
        );
    }
}
