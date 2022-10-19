import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as d3 from 'd3';
import * as _ from 'lodash';
import { BaseComponent } from 'src/app/core/base.component';
import { CharacterPreferences } from 'src/app/modules/characters/models/character-preferences.model';
import { IPreferenceTypes } from 'src/app/modules/characters/models/preference-type.model';
import * as tinycolor from 'tinycolor2';
import { preferenceTypes } from '../../../../../../preference-types';

@Component({
    selector: 'app-current-preferences-chart',
    templateUrl: './current-preferences-chart.component.html',
    styleUrls: ['./current-preferences-chart.component.scss'],
})
export class CurrentPreferencesComponent
    extends BaseComponent
    implements OnInit
{
    @ViewChild('preferencesChart')
    private chartContainer: ElementRef | null = null;

    @Input() preferences: CharacterPreferences[] = [];
    preferenceTypes: IPreferenceTypes[] = preferenceTypes;

    @Input() color: string | null = null;

    isLinearChartVisible = false;

    chosenCharId?: number;
    chosenChar: CharacterPreferences | null = null;

    constructor(private _translate: TranslateService) {
        super();
    }

    ngOnInit() {
        setTimeout(() => {
            this.chartContainer = this.chartContainer;
            this.createChart();
        }, 0);
    }

    createChart() {
        const element = (this.chartContainer as any).nativeElement;
        const svgWidth =
            (this.chartContainer as any).nativeElement.offsetWidth > 650
                ? 650
                : (this.chartContainer as any).nativeElement.offsetWidth;
        const svgHeight = 100;
        const margin = { top: 30, right: 40, bottom: 50, left: 60 };
        const height = svgHeight - margin.top - margin.bottom;
        const width = svgWidth - margin.left - margin.right;

        let circles: any;
        let rects: any;

        let lineColor = 'white';

        const xAxisScale = d3.scaleLinear().domain([0, 100]).range([0, width]);

        const lazyZoom = _.debounce((event: any) => {
            const new_xScale = event.transform.rescaleX(xAxisScale);
            const transform: d3.ZoomTransform = event.transform;
            const transformString = `translate(${transform.x},0) scale(${transform.k},1)`;

            gX.transition().duration(50).call(xAxis.scale(new_xScale));

            circles?.attr('cx', (d: any) => new_xScale(d.range));
            rects?.attr('transform', transformString);

            // color
            svgViewport.selectAll('line').style('stroke', lineColor);

            svgViewport.selectAll('text').style('fill', lineColor);
        }, 10);

        const svgViewport = d3
            .select(element)
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .on('mousewheel', (e: any) => {
                e.preventDefault();
            })
            .call(
                (d3 as any)
                    .zoom()
                    .scaleExtent([1, 4])
                    .translateExtent([
                        [0 - width * 0.2, 0],
                        [width * 1.2, height],
                    ])
                    .on('zoom', (event: any) => {
                        lazyZoom(event);
                    })
            );
        // Inner Drawing Space
        const innerSpace = svgViewport
            .append('g')
            .attr('class', 'inner_space')
            .attr(
                'transform',
                'translate(' + margin.left + ',' + margin.top + ')'
            );

        const defs = svgViewport.append('defs');

        const shadowFilter = defs.append('filter').attr('id', 'shadow');

        shadowFilter
            .append('svg:feDropShadow')
            .attr('dx', '0.2')
            .attr('dy', '0')
            .attr('stdDeviation', '1.7');

        for (const pref of this.preferences) {
            defs.append('pattern')
                .attr('id', 'image_' + (pref as any).id)
                .attr('x', '0')
                .attr('y', '0')
                .attr('height', '1')
                .attr('width', '1')
                .attr('patternContentUnits', 'objectBoundingBox')
                .append('image')
                .attr('x', '0')
                .attr('y', '0')
                .attr('height', '1')
                .attr('width', '1')
                .attr('preserveAspectRatio', 'xMidYMid slice')
                .attr('xlink:href', pref.profilePic);
        }

        rects = (innerSpace as any)
            .append('g')
            .attr('id', 'rects')
            .selectAll('rect')
            .data(this.preferenceTypes)
            .enter()
            .append('rect')
            .attr('width', (d: any) =>
                xAxisScale(d.preferenceMax - d.preferenceMin)
            )
            .attr('height', '50')
            .attr('y', '-40')
            .attr('x', (d: any) => xAxisScale(d.preferenceMin))
            .attr('style', 'filter: url(#shadow)')
            .attr('fill', (d: any) => d.color);

        const circlesGroup = innerSpace
            .append('g')
            .attr('id', 'circles')
            .selectAll('circle')
            .data(this.preferences)
            .enter();

        // circlesGroup

        circles = (circlesGroup as any)
            .append('circle')
            .attr('r', 18)
            .attr('cy', '-10')
            .attr('cx', (d: any) => xAxisScale(d.range))
            .attr('stroke', 'black')
            .attr('fill', (d: any) =>
                d?.profilePic ? `url(#image_${d?.id})` : 'slategray'
            )
            .on('click', (d: any) => {
                const data = d.target.__data__;
                this.isLinearChartVisible = true;
                this.chosenCharId = data.id;
                this.chosenChar = data;
            });

        // create axis objects
        const xAxis = d3.axisBottom(xAxisScale);
        const gX = innerSpace
            .append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        svgViewport.selectAll('line').style('stroke', lineColor);

        svgViewport.selectAll('path').style('stroke', lineColor);

        svgViewport.selectAll('text').style('fill', lineColor);
    }
}
