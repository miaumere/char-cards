import { IHistoricalPreference } from '../../../../../../../../models/historical-preference.model';
import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChange,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { IAllPreferences } from 'src/app/modules/characters/models/all-preferences.model';
import * as d3 from 'd3';
import * as moment from 'moment';

interface IPreferenceTypes {
    preferenceType: string;
    color: string;
    preferenceMin: number;
    preferenceMax: number;
}

interface IHistoricalPreferencesComponentRouteParams {
    id: string;
}

@Component({
    selector: 'app-historical-preferences-chart',
    styleUrls: ['./historical-preferences-chart.component.scss'],
    template: ` <figure #historicalPreferencesChart></figure>`,
})
export class HistoricalPreferencesComponent
    extends BaseComponent
    implements OnInit, OnChanges
{
    private chartContainer: ElementRef | undefined;
    @ViewChild('historicalPreferencesChart') set content(content: ElementRef) {
        this.chartContainer = content;
    }

    @Input() preferenceTypes: IPreferenceTypes[] = [];
    @Input() relatedcharId: number = 0;

    charId: number = Number(
        (
            this._activatedRoute.snapshot
                .params as IHistoricalPreferencesComponentRouteParams
        ).id
    );

    isLinearChartVisible = false;

    historicalPreferences: IAllPreferences | null = null;

    constructor(
        private _translate: TranslateService,
        private _charactersService: CharactersService,
        private _activatedRoute: ActivatedRoute
    ) {
        super();
    }

    ngOnInit() {
        this.getHistoricalPreferences();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const relatedCharChanges: SimpleChange | undefined =
            changes.relatedCharId;
        if (relatedCharChanges?.firstChange === false) {
            this.getHistoricalPreferences();
        }
        this.chartContainer?.nativeElement.childNodes[0].remove();
    }

    getHistoricalPreferences() {
        this.subscriptions$.add(
            this._charactersService
                .getCharactersHistoricalPreferences(
                    this.charId,
                    this.relatedcharId
                )
                .subscribe((historicalPreferences) => {
                    this.historicalPreferences = historicalPreferences;

                    if (historicalPreferences.preferences.length === 1) {
                        const pref: IHistoricalPreference = {
                            range: historicalPreferences.preferences[0].range,
                            dateOfOrigin: new Date(0).toString(),
                        };

                        historicalPreferences.preferences.push(pref);
                        const tmp = historicalPreferences.preferences[0];
                        historicalPreferences.preferences[0] =
                            historicalPreferences.preferences[1];
                        historicalPreferences.preferences[1] = tmp;
                        console.log(historicalPreferences.preferences);
                    }
                    this.createChart();
                })
        );
    }

    createChart() {
        const element = this.chartContainer?.nativeElement;
        const svgWidth = this.chartContainer?.nativeElement.offsetWidth;
        const svgHeight = 200;
        const margin = { top: 30, right: 40, bottom: 50, left: 60 };
        const height = svgHeight - margin.top - margin.bottom;
        const width = svgWidth - margin.left - margin.right;

        const xAxisScale = d3
            .scaleTime()
            .domain([
                new Date(
                    this.historicalPreferences!.preferences[0].dateOfOrigin
                ),
                this.historicalPreferences!.preferences[
                    this.historicalPreferences!.preferences.length - 1
                ].dateOfOrigin
                    ? new Date(
                          this.historicalPreferences!.preferences[
                              this.historicalPreferences!.preferences.length - 1
                          ].dateOfOrigin
                      )
                    : new Date(),
            ])
            .range([0, width - margin.left - 20]);

        const yAxisScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

        const valueline = d3
            .line()
            .x((d: any): any => {
                return xAxisScale(
                    !!d.dateOfOrigin
                        ? new Date(d.dateOfOrigin)
                        : new Date(Date.now())
                );
            })
            .y((d: any): any => {
                return yAxisScale(d.range);
            });

        const svg = d3
            .select(element)
            .append('svg')
            .attr('width', width)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr(
                'transform',
                'translate(' + margin.left + ',' + margin.top + ')'
            );

        (svg as any)
            .append('g')
            .attr('id', 'rects')
            .selectAll('rect')
            .data(this.preferenceTypes)
            .enter()
            .append('rect')
            .attr('height', (d: any) => d.preferenceMax - d.preferenceMin + 3)
            .attr('width', width)
            .attr('y', (d: any) => yAxisScale(d.preferenceMax))
            .attr('x', '0')
            .attr('fill', (d: any) => d.color);

        svg.append('g')
            .attr('transform', `translate(${0}, ${height})`)
            .call(
                d3
                    .axisBottom(xAxisScale)
                    .tickFormat((d3 as any).timeFormat('%d.%m.%Y'))
                    .tickFormat((d: any) => {
                        const typedD = d as Date;
                        if (
                            moment(new Date(typedD)).format('DD.MM.YYYY') ===
                            moment(new Date()).format('DD.MM.YYYY')
                        ) {
                            return this._translate.instant('SHARED.NOW');
                        } else if (
                            moment(new Date(typedD)).format('MM.YYYY') ===
                            '01.1970'
                        ) {
                            return '?';
                        } else {
                            return moment(new Date(typedD)).format('MM.YYYY');
                        }
                    })
                    .tickValues(
                        this.historicalPreferences!.preferences.map((d: any) =>
                            d.dateOfOrigin
                                ? new Date(d.dateOfOrigin)
                                : new Date()
                        )
                    )
            );

        svg.append('g').call(
            d3.axisLeft(yAxisScale).tickValues([0, 25, 50, 75, 100])
        );

        svg.append('path')
            .data([this.historicalPreferences?.preferences])
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', '#9B75B9')
            .attr('stroke-width', 2)
            .attr('d', valueline as any);

        (svg as any)
            .selectAll('.dot')
            .data(this.historicalPreferences?.preferences)
            .enter()
            .append('circle')
            .attr('r', 3)
            .attr('fill', 'white')
            .attr('stroke', '#9B75B9')
            .attr('stroke-width', '2')
            .attr('cx', (d: any) =>
                xAxisScale(
                    d.dateOfOrigin ? new Date(d.dateOfOrigin) : new Date()
                )
            )
            .attr('cy', (d: any) => yAxisScale(d.range));

        svg.selectAll('line').style('stroke', 'white');

        svg.selectAll('text').style('fill', 'white');

        svg.selectAll('.domain').style('stroke', 'none');
    }
}
