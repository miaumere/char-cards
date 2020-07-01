import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/core/base.component';

import * as d3 from 'd3';



@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.scss']
})
export class FamilyTreeComponent extends BaseComponent implements OnInit {
  @ViewChild('familyTree')
  private chartContainer: ElementRef;

  data = {
    id: 1,
    name: 'Micet Maske',
    birthday: '10-10-1995',
    siblings: [
      {
        id: 2,
        name: 'Albin Maske',
        birthday: '10-10-1991'
      },
      {
        id: 3,
        name: 'Gunter Maske',
        birthday: '10-10-1991'
      },
      {
        id: 123,
        name: 'Maximilian Maske',
        birthday: '10-10-1991'
      },
      {
        id: 124,
        name: 'Aloysius Maske',
        birthday: '10-10-1991'
      },
      {
        id: 125,
        name: 'Hans Maske',
        birthday: '10-10-1991'
      }
    ],
    parents: [
      {
        id: 4,
        name: 'Lotta Maske',
        birthday: '10-10-1999',
        parents: [
          {
            id: 6,
            name: 'Wolfgang Kohler',
            birthday: '10-10-1999'
          },
          {
            id: 7,
            name: 'Adelheid Kohler',
            birthday: '10-10-1999'
          },
        ]
      },
      {
        id: 5,
        name: 'Valentin Maske',
        birthday: '10-10-1999',
        parents: [
          {
            id: 6,
            name: 'Angela Maske',
            birthday: '10-10-1999'
          },
          {
            id: 7,
            name: 'Theodor Maske',
            birthday: '10-10-1999'
          },
        ]
      }
    ],
    marriedTo: null
  };

  element;
  svgWidth;
  svgHeight = 400;

  margin = { top: 30, right: 40, bottom: 50, left: 60 };
  height;
  width;

  rectWidth = 50;
  rectHeight = 50;
  constructor(
    private _translate: TranslateService,
    private _activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    setTimeout(() => {
      this.chartContainer = this.chartContainer;

      this.element = this.chartContainer.nativeElement;
      this.svgWidth = this.chartContainer.nativeElement.offsetWidth;
      this.svgHeight = 400;

      this.height = this.svgHeight - this.margin.top - this.margin.bottom;
      this.width = this.svgWidth - this.margin.left - this.margin.right;

      this.createChart();
    }, 0);

  }




  createChart() {


    const svg = d3.select(this.element)
      .append('svg')
      .attr('width', this.svgWidth)
      .attr('height', this.height);



    const charG = svg.append('g')
      // .attr('transform', `translate(${(this.width / 2) + 25}, ${this.height - 50})`)
      .attr('transform', `translate(${(this.width / 2) + 25}, ${this.height - (this.rectHeight * 3)})`)


    charG.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.rectWidth)
      .attr('height', this.rectHeight)
      .attr('fill', 'red')

    charG.append('text')
      .datum(this.data)
      .attr('x', 0)
      .attr('y', this.rectHeight)
      .text(d => d.name);


    this.generateParents(svg, this.data, 0, false)
    this.generateParents(svg, this.data.parents[1], 2, true)
    this.generateParents(svg, this.data.parents[0], 2, false)


    if (!!this.data.siblings) {
      for (let i = 0; i < this.data.siblings.length; i++) {
        this.generateSiblings(svg, this.data.siblings[i], i)
      }
    }

  }

  generateParents(svg, data: any, depth: number, left?: boolean) {
    if (depth === 0) {
      const parentsG = svg.append('g')
        .attr('transform',
          `translate(${(this.width / 2) + 25}, ${this.height - (this.rectHeight * 4.5)})`
        )
      const singleParent1G = parentsG.append('g')
      const rect1 = singleParent1G.append('rect')
        .attr('x', `-${this.rectWidth}`)
        .attr('y', 0)
        .attr('width', this.rectWidth)
        .attr('height', this.rectHeight)
        .attr('fill', 'green')

      singleParent1G.append('text')
        .datum(data.parents[0])
        .attr('x', `-${this.rectWidth}`)
        .attr('y', this.rectHeight)
        .text(d => d.name);

      const singleParent2G = parentsG.append('g')
      const rect2 = singleParent2G.append('rect')
        .attr('x', this.rectWidth)
        .attr('y', 0)
        .attr('width', this.rectWidth)
        .attr('height', this.rectHeight)
        .attr('fill', 'green')

      singleParent2G.append('text')
        .datum(data.parents[1])
        .attr('x', this.rectWidth)
        .attr('y', this.rectHeight)
        .text(d => d.name);


      parentsG
        .append('line')
        .attr('x1', this.rectWidth)
        .attr('y1', this.rectWidth / 2)
        .attr('x2', 0)
        .attr('y2', this.rectWidth / 2)
        .attr('stroke-width', '2')



    } else {
      const parentsG = svg.append('g')
        .attr('transform',
          `translate(${(this.width / 2 - (5 * depth))}, ${this.height - ((this.rectHeight * 3) * depth)})`
        )
      const singleParent1G = parentsG.append('g')
      singleParent1G.append('rect')
        .attr('x', left ? this.rectWidth * depth : 0)
        .attr('y', 0)
        .attr('width', this.rectWidth)
        .attr('height', this.rectHeight)
        .attr('fill', 'green')

      singleParent1G.append('text')
        .datum(data.parents[0])
        .attr('x', left ? this.rectWidth * depth : 0)
        .attr('y', this.rectHeight)
        .text(d => d.name);


      const singleParent2G = parentsG.append('g')
      singleParent2G.append('rect')
        .attr('x', left ?
          (left ? this.rectWidth * depth : 0) + this.rectWidth * depth
          : (left ? this.rectWidth * depth : 0) - this.rectWidth * depth)
        .attr('y', 0)
        .attr('width', this.rectWidth)
        .attr('height', this.rectHeight)
        .attr('fill', 'green')

      singleParent2G.append('text')
        .datum(data.parents[1])
        .attr('x', left ?
          (left ? this.rectWidth * depth : 0) + this.rectWidth * depth
          : (left ? this.rectWidth * depth : 0) - this.rectWidth * depth)
        .attr('y', this.rectHeight)
        .text(d => d.name);


      console.log(parentsG.node())
      // parentsG
      //   .append('line')
      //   .attr('x1', this.width / 2 - (5 * depth))
      //   .attr('y1', (this.width / 2 - (5 * depth)) / 2)
      //   .attr('x2', 0)
      //   .attr('y2', (this.width / 2 - (5 * depth)) / 2)
      //   .attr('stroke-width', '2')


    }
  }

  generateSiblings(svg, data: any, order: number) {
    const parentsG = svg.append('g')
      // (left ? this.rectWidth * depth : 0) + this.rectWidth * depth
      .attr('transform',
        order % 2 !== 0 ? `translate(${(this.width / 2) + (this.rectWidth * (2 + order))}, ${this.height - (this.rectHeight * 3)})`
          : `translate(${(this.width / 2) - (order * this.rectWidth)}, ${this.height - (this.rectHeight * 3)})`)

    const singleParent1G = parentsG.append('g')
    const rect1 = singleParent1G.append('rect')
      .attr('x', `-${this.rectWidth}`)
      .attr('y', 0)
      .attr('width', this.rectWidth)
      .attr('height', this.rectHeight)
      .attr('fill', 'blue')

    singleParent1G.append('text')
      .attr('x', `-${this.rectWidth}`)
      .attr('y', this.rectHeight)
      .text(data.name);

  }

  generateChildren() {

  }
}
