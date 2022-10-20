import { IRelatedPersonData } from './../../../../../../../../../models/relations/relation-tree-dto.model';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import * as d3 from 'd3';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, throttleTime } from 'rxjs/operators';
import {
    ICoordinatesRequest,
    IRelationTreeDto,
    IRelationTreePersonDto,
    IRelationTreeRelation,
    RelationTreeDto,
    RelationTreePersonDto,
    RelationTreeRelation,
} from 'src/app/modules/characters/models/relations/relation-tree-dto.model';
import {
    RelationType,
    RelationTypeString,
} from 'src/app/modules/characters/models/relations/relation-type.enum';
import { colorsForRelations } from './colors-for-relations.const';

import * as moment from 'moment';

function degToRad(deg: number) {
    return (deg * Math.PI) / 180;
}

interface IGeneratedCircleElement {
    circle: any;
    text: any;
}

@Component({
    selector: 'app-relation-tree',
    templateUrl: './relation-tree.component.html',
    styleUrls: ['./relation-tree.component.scss'],
})
export class RelationTreeComponent extends BaseComponent implements OnInit {
    readonly colorsForRelations = colorsForRelations;

    @Input() charId: number = 0;

    @Input() reloadChartObservable = new BehaviorSubject(false);

    @ViewChild('chart')
    private chartContainer: ElementRef | null = null;

    relations: IRelationTreeDto | undefined;
    svg: SVGElement | undefined;

    data: RelationTreeDto | null = null;

    relationTypes = Object.keys(RelationType).filter(
        (key: any) => !isNaN(Number(RelationType[key]))
    );

    public get isDataEmpty(): boolean {
        return !(this.data?.persons.length || this.data?.relations.length);
    }

    constructor(
        private router: Router,
        private _charactersService: CharactersService
    ) {
        super();

        setTimeout(() => {
            this._getCharacterTreeData();
        }, 0);
    }

    circleRadius = 35;

    ngOnInit() {
        this.reloadChartObservable.pipe(skip(1)).subscribe(() => {
            this.chartContainer?.nativeElement.childNodes[0].remove();

            this._getCharacterTreeData();
        });
    }

    private _getCharacterTreeData() {
        this.subscriptions$.add(
            this._charactersService
                .getRelationsTreeData(this.charId)
                .subscribe((data) => {
                    this.data = data;
                    if (!!data) {
                        this.chartContainer = this.chartContainer;
                        this.createChart();
                    }
                })
        );
    }

    private _generateCircle(
        svgViewport: any,
        offsetX: number,
        offsetY: number,
        fill: string,
        name: string,
        radius: number,
        strokeColor: string,
        person?: IRelatedPersonData
    ): IGeneratedCircleElement {
        const circle = svgViewport
            .append('circle')
            .attr('cx', offsetX)
            .attr('cy', offsetY)
            .attr('r', radius)
            .attr('stroke', strokeColor)
            .attr('class', 'no-profile-pic-svg')
            .attr(
                'fill',
                person?.imageMimeData ? `url(#${person?.id})` : 'slategray'
            );

        const cleanUrl = [...this.router.url].filter((x) => isNaN(+x)).join('');

        const text = svgViewport
            .append('a')
            .attr(
                'xlink:href',
                person?.id ? `./#/${cleanUrl}${person?.id}` : null
            )
            .append('text')
            .attr('x', offsetX)
            .attr('y', offsetY + radius + 15)
            .style('font-size', 'small')
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .text(name);

        return { circle, text };
    }

    private createChart(): void {
        const typedD3 = d3 as any;
        const element = (this.chartContainer as any).nativeElement;

        const svgWidth = 600;
        const svgHeight = 450;

        const moveMouseEvent = new Subject<MouseEvent>();

        const svgViewport = typedD3
            .select(element)
            .append('svg')
            .attr('style', 'background-color: ' + '#1b1d1e')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .on('mousemove', (e: any) => {
                moveMouseEvent.next(e);
            });

        // #region generate pattern
        const defs = svgViewport.append('defs');
        if (this.data?.relations) {
            for (const person of this.data?.persons) {
                defs.append('pattern')
                    .attr('id', person.id)
                    .attr('x', '0')
                    .attr('y', '0')
                    .attr('height', '1')
                    .attr('width', '1')
                    .attr('patternContentUnits', 'objectBoundingBox')
                    .append('image')
                    .attr('href', person.imageMimeData)
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('height', '1')
                    .attr('width', '1')
                    .attr('preserveAspectRatio', 'xMidYMid slice');
            }
        }

        // #endregion

        // #region generate markers
        for (const relationType of this.relationTypes) {
            const typedRelationType = relationType as RelationTypeString;
            defs.append('marker')
                .attr('id', typedRelationType)
                .attr('viewBox', [0, 0, 10, 10])
                .attr('refX', 9)
                .attr('refY', 6)
                .attr('markerWidth', 6)
                .attr('markerHeight', 5)
                .attr('orient', 'auto-start-reverse')
                .append('path')
                .attr('d', 'M2,2 L10,6 L2,10 L6,6 L2,2')
                .attr(
                    'fill',
                    this.colorsForRelations.find(
                        (x) => x.relationType === relationType
                    )?.fillColor
                )
                .attr(
                    'stroke',
                    this.colorsForRelations.find(
                        (x) => x.relationType === relationType
                    )?.fillColor
                );
        }

        // #endregion

        let clickedCircle: {
            circle: IGeneratedCircleElement;
            person: RelationTreePersonDto;
        } | null = null;

        const typedPersons = this.data?.persons as any[];
        for (let person of typedPersons) {
            const circle = this._generateCircle(
                svgViewport,
                person.coordinates.x,
                person.coordinates.y,
                person.imageMimeData,
                person.fullName,
                this.circleRadius,
                'black',
                person
            );

            circle.circle
                .on('mousedown', (e: Event) => {
                    clickedCircle = {
                        circle,
                        person,
                    };
                })
                .on('mouseup', (e: Event) => {
                    clickedCircle = null;
                });
        }

        moveMouseEvent.pipe(throttleTime(10)).subscribe((x: any) => {
            if (clickedCircle) {
                const mouseCordX = x.offsetX;
                const mouseCordY = x.offsetY;

                clickedCircle.person.coordinates.x = mouseCordX;
                clickedCircle.person.coordinates.y = mouseCordY;

                clickedCircle.circle.circle.attr('cx', mouseCordX);
                clickedCircle.circle.circle.attr('cy', mouseCordY);

                clickedCircle.circle.text.attr('x', mouseCordX);
                clickedCircle.circle.text.attr(
                    'y',
                    mouseCordY + this.circleRadius + 15
                );

                clickedCircle.person.id;

                this._countRelations(svgViewport);
            }
        });

        this._countRelations(svgViewport);
    }

    private _countRelations(svgViewport: any) {
        for (let relationElement of this.relationElements) {
            const typedRelationElement = relationElement as any;
            typedRelationElement.remove();
        }
        svgViewport.selectAll('g.label').remove();

        this.relationElements = [];

        const relationsMap = new Map();

        for (let relation of this.data!.relations) {
            const generateMapKey = (
                idSource: number,
                idTarget: number
            ): string => {
                return idSource > idTarget
                    ? `${idTarget}-${idSource}`
                    : `${idSource}-${idTarget}`;
            };

            const source = this.data!.persons.find(
                (x) => x.id == relation.source
            );
            const target = this.data!.persons.find(
                (x) => x.id == relation.target
            );

            const keyToCheck = generateMapKey(source!.id, target!.id);

            if (!relationsMap.has(keyToCheck)) {
                relationsMap.set(generateMapKey(source!.id, target!.id), []);
            }

            const relationMapValue = relationsMap.get(
                keyToCheck
            ) as RelationTreeRelation[];

            relationMapValue.push(relation);
        }

        const angleBetweenRelationsOnPerimeter = 20;

        for (const [, relationsBetweenTwo] of [...relationsMap]) {
            const relationsBetweenTwoTyped =
                relationsBetweenTwo as RelationTreeRelation[];

            const relationsCount = relationsBetweenTwo.length;

            const firstRelation = relationsBetweenTwoTyped[0];
            const source = this.data?.persons.find(
                (x) => x.id === firstRelation.source
            );
            const target = this.data?.persons.find(
                (x) => x.id === firstRelation.target
            );

            const relationAngle =
                (Math.atan2(
                    source!.coordinates.x - target!.coordinates.x,
                    source!.coordinates.y - target!.coordinates.y
                ) *
                    180) /
                    Math.PI +
                180;

            for (let relationIndex in relationsBetweenTwoTyped) {
                const relation = relationsBetweenTwo[
                    relationIndex
                ] as IRelationTreeRelation;

                const pointGeneration = (
                    person: RelationTreePersonDto,
                    rotate: boolean
                ): PointCoords => {
                    const angleRange =
                        (relationsCount - 1) * angleBetweenRelationsOnPerimeter;

                    let relationAngleRotation = relationAngle;
                    if (rotate) {
                        relationAngleRotation -= 180;
                    }

                    const startValue =
                        relationAngleRotation -
                        ((rotate ? -1 : 1) * angleRange) / 2;

                    let computedRelationAngle =
                        startValue +
                        (rotate ? -1 : 1) *
                            +relationIndex *
                            angleBetweenRelationsOnPerimeter;

                    const relationAngleDegrees = degToRad(
                        computedRelationAngle
                    );
                    const xAdd =
                        this.circleRadius * Math.sin(relationAngleDegrees);
                    const yAdd =
                        this.circleRadius * Math.cos(relationAngleDegrees);

                    const element = this._generateCircle(
                        svgViewport,
                        person.coordinates.x + xAdd,
                        person.coordinates.y + yAdd,
                        'transparent',
                        '',
                        1,
                        'transparent'
                    );

                    return {
                        x: person.coordinates.x + xAdd,
                        y: person.coordinates.y + yAdd,
                        element: element,
                    };
                };

                const relationType: RelationType = relation.type;

                const isRelationBidirectional = (relation: RelationType) => {
                    const relationAsString = '' + relation;
                    return (
                        relationAsString ===
                            RelationType[RelationType.Marriage] ||
                        relationAsString ===
                            RelationType[RelationType.Relationship] ||
                        relationAsString ===
                            RelationType[RelationType.Sibling] ||
                        relationAsString === RelationType[RelationType.Romance]
                    );
                };

                const generateLine = (
                    startPoint: PointCoords,
                    endPoint: PointCoords
                ) => {
                    const line = svgViewport
                        .append('line')
                        .attr('x1', startPoint.x)
                        .attr('y1', startPoint.y)
                        .attr('x2', endPoint.x)
                        .attr('y2', endPoint.y)
                        .attr(
                            'stroke',
                            this.colorsForRelations.find(
                                (x) =>
                                    x.relationType ===
                                    (relationType as unknown as RelationTypeString)
                            )?.fillColor
                        )
                        .attr('stroke-width', '2px')
                        .attr(
                            'stroke-dasharray',
                            relation.relationDateEnd ? '6' : '0'
                        )
                        .attr(
                            'marker-end',
                            relation.source === source!.id ||
                                isRelationBidirectional(relation.type)
                                ? `url(#${relationType})`
                                : null
                        )
                        .attr(
                            'marker-start',
                            relation.source !== source!.id ||
                                isRelationBidirectional(relation.type)
                                ? `url(#${relationType})`
                                : null
                        );

                    const labelGroup = svgViewport
                        .append('g')
                        .attr('class', 'label');

                    const rectWidth = 60;
                    const rectHeight = 13;

                    const rectX = (startPoint.x + endPoint.x) / 2 - 25;
                    const rectY = (startPoint.y + endPoint.y) / 2 - 5;

                    const rectXAxisPos = rectX + rectWidth / 2;
                    const rectYAxisPos = rectY + rectHeight / 2;

                    const angleToSet = relationAngle * -1 - 90;

                    labelGroup
                        .append('rect')
                        .attr('x', rectX)
                        .attr('y', rectY)
                        .attr('fill', '#1b1d1e')

                        .attr('stroke-width', '1')
                        .attr(
                            'transform',
                            `rotate(${angleToSet}, ${rectXAxisPos}, ${rectYAxisPos})`
                        )
                        .attr(
                            'stroke',
                            this.colorsForRelations.find(
                                (x) =>
                                    x.relationType ===
                                    (relationType as unknown as RelationTypeString)
                            )?.fillColor
                        )
                        .attr('width', rectWidth)
                        .attr('height', rectHeight)
                        .attr('rx', 2);

                    const textX = (startPoint.x + endPoint.x) / 2 + 5;
                    const textY = (startPoint.y + endPoint.y) / 2 + 4;

                    labelGroup
                        .append('text')
                        .attr('x', textX)
                        .attr('y', textY)
                        .attr(
                            'transform',
                            `rotate(${
                                !(angleToSet < -270 && angleToSet > -450)
                                    ? angleToSet - 180
                                    : angleToSet
                            }, ${rectXAxisPos}, ${rectYAxisPos})`
                        )
                        .attr('text-anchor', 'middle')
                        .attr('font-size', '8px')
                        .attr('fill', 'white')
                        .text(relation.type);

                    if (
                        relation.relationDateEnd ||
                        relation.relationDateStart
                    ) {
                        const getDateString = (date: number | null): string => {
                            if (date) {
                                return moment(date).format('DD/MM/YYYY');
                            }
                            return '?';
                        };
                        const tooltip = labelGroup
                            .append('text')
                            .attr('x', textX)
                            .attr('y', textY - 20)
                            .attr(
                                'transform',
                                `rotate(${
                                    !(angleToSet < -270 && angleToSet > -450)
                                        ? angleToSet - 180
                                        : angleToSet
                                }, ${rectXAxisPos}, ${rectYAxisPos})`
                            )
                            .attr('fill', 'transparent')
                            .attr('text-anchor', 'middle')
                            .attr('font-size', '10px')
                            .text(
                                `${getDateString(
                                    relation.relationDateStart
                                )} -> ${getDateString(
                                    relation.relationDateEnd
                                )}`
                            );

                        const moveMouseEvent = new Subject<MouseEvent>();

                        labelGroup
                            .on('mousemove', (e: MouseEvent) => {
                                moveMouseEvent.next(e);
                            })
                            .on('mouseout', () => {
                                tooltip.attr('fill', 'transparent');
                            });

                        moveMouseEvent.pipe(throttleTime(10)).subscribe(() => {
                            tooltip.attr('fill', 'white');
                        });
                    }

                    return line;
                };

                const startPoint = pointGeneration(source as any, false);
                const endPoint = pointGeneration(target as any, true);

                this.relationElements.push(startPoint.element.circle);
                this.relationElements.push(startPoint.element.text);

                this.relationElements.push(endPoint.element.circle);
                this.relationElements.push(endPoint.element.text);

                interface PointCoords {
                    x: number;
                    y: number;
                    element: IGeneratedCircleElement;
                }

                this.relationElements.push(generateLine(startPoint, endPoint));
            }
        }
    }

    relationElements: any[] = [];

    upsertCoords() {
        const request: ICoordinatesRequest[] = [];

        if (this.data) {
            for (const person of this.data?.persons) {
                const requestItem: ICoordinatesRequest = {
                    characterId: person.id,
                    x: person.coordinates.x,
                    y: person.coordinates.y,
                };
                request.push(requestItem);
            }
        }

        this.subscriptions$.add(
            this._charactersService
                .upsertCoords(this.charId, request)
                .subscribe(() => {
                    this.reloadChartObservable.next(true);
                })
        );
    }
}
