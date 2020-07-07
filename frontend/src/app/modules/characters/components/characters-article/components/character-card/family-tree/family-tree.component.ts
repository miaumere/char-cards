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
        ],
        siblings: [
          {
            id: 222,
            name: 'Hanne Kohler',
            birthday: '10-10-1991'
          },
          {
            id: 224,
            name: 'Hanne Kohler',
            birthday: '10-10-1991'
          },
          {
            id: 226,
            name: 'Vincent Maske',
            birthday: '10-10-1991'
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
        ],
        siblings: [
          {
            id: 227,
            name: 'Vincent Maske',
            birthday: '10-10-1991'
          },
          {
            id: 22632,
            name: 'Vincent Maske',
            birthday: '10-10-1991'
          },
          {
            id: 22245,
            name: 'Vincent Maske',
            birthday: '10-10-1991'
          },
        ]
      }
    ],
    marriedTo: {
      id: 444,
      name: 'Banananan',
      birthday: '10-10-1999'
    },
    children: [
      {
        id: 123,
        name: 'dziecko 1',
        birthday: '10-10-1999'
      },
      {
        id: 123,
        name: 'dziecko 2',
        birthday: '10-10-1999'
      },
      {
        id: 123,
        name: 'dziecko 3',
        birthday: '10-10-1999'
      }
    ]
  };

  element;
  svgWidth;
  svgHeight = 400;

  margin = { top: 30, right: 40, bottom: 50, left: 60 };
  height;
  width;

  nameMargin = 5;
  nameMarginBottom = 10;

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
      .attr('height', this.height)
      .style('background', 'white');

    //#region
    const maleBgGroup = svg.append('g');
    maleBgGroup.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.svgWidth / 2)
      .attr('height', this.height - (this.rectHeight * 2) + 20)
      .attr('fill', 'rgba(76, 93, 182, 0.2)');

    const femaleBgGroup = svg.append('g');
    femaleBgGroup.append('rect')
      .attr('x', this.svgWidth / 2)
      .attr('y', 0)
      .attr('width', this.svgWidth / 2)
      .attr('height', this.height - (this.rectHeight * 2) + 20)
      .attr('fill', 'rgba(182, 76, 158, 0.2)');
    //#endregion
    const charG = svg.append('g')
      .attr('transform', `translate(${(this.width / 2) + 25}, ${this.height - (this.rectHeight * 3)})`);

    this.createCircleWithImage(charG, this.data, (this.rectWidth / 2));


    charG.append('text')
      .datum(this.data)
      .attr('x', -this.nameMargin)
      .attr('y', this.rectHeight - this.nameMarginBottom)
      .text(d => d.name);

    charG.append('text')
      .datum(this.data)
      .attr('class', 'birthday')
      .attr('x', -this.nameMargin)
      .attr('y', this.rectHeight)
      .text(d => d.birthday);


    this.generateParents(svg, this.data, false, false);

    if (!!this.data.parents) {
      for (let i = 0; i < this.data.parents.length; i++) {
        this.generateParents(svg, this.data.parents[i], true, i % 2 === 1);
      }
    }

    if (!!this.data.siblings) {
      for (let i = 0; i < this.data.siblings.length; i++) {
        this.generateSiblings(svg, this.data.siblings[i], i);
      }
    }
    if (!!this.data.marriedTo) {
      this.generatePartner(svg, this.data.marriedTo);
    }
    if (!!this.data.children) {
      this.generateChildren(svg, this.data.children);
    }

    const birthdays = d3.selectAll('.birthday')
      .style('font-size', 'xx-small')
      .style('opacity', '0.5')


    console.log("birthdays: ", birthdays)
  }

  generateParents(svg, data: any, areGrandparents: boolean, left?: boolean) {
    if (!areGrandparents) {
      const parentsG = svg.append('g')
        .attr('transform',
          `translate(${(this.width / 2) + 25}, ${this.height - (this.rectHeight * 4.5)})`
        );

      if (!!data.parents[0] && !!data.parents[1]) {
        parentsG.append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', this.rectWidth)
          .attr('height', 20)
          .attr('fill', 'whitesmoke');

        parentsG.append('text')
          .attr('x', 0)
          .attr('y', 15)
          .text('12.12.2010')
          .style('font-size', 'xx-small')


      }

      if (!!data.parents[0]) {
        const singleParent1G = parentsG.append('g');
        this.createCircleWithImage(singleParent1G, data.parents[0]);

        singleParent1G.append('text')
          .datum(data.parents[0])
          .attr('x', `-${this.rectWidth + this.nameMargin}`)
          .attr('y', this.rectHeight - this.nameMarginBottom)
          .text(d => d.name);

        singleParent1G.append('text')
          .datum(data)
          .attr('class', 'birthday')
          .attr('x', `-${this.rectWidth + this.nameMargin}`)
          .attr('y', this.rectHeight)
          .text(d => d.birthday);

        if (!!data && !!data.parents[0].siblings) {
          this.generateParentSiblings(svg, data.parents[0].siblings, true);
        }
      }

      if (!!data.parents[1]) {
        const singleParent2G = parentsG.append('g');

        this.createCircleWithImage(singleParent2G, data.parents[1], this.rectWidth + 25)

        singleParent2G.append('text')
          .datum(data.parents[1])
          .attr('x', this.rectWidth - this.nameMargin)
          .attr('y', this.rectHeight - this.nameMarginBottom)
          .text(d => d.name);

        singleParent2G.append('text')
          .datum(data)
          .attr('class', 'birthday')
          .attr('x', this.rectWidth + this.nameMargin)
          .attr('y', this.rectHeight)
          .text(d => d.birthday);

        if (!!data && !!data.parents[1].siblings) {
          this.generateParentSiblings(svg, data.parents[1].siblings, false);
        }
      }

    } else {
      const parentsG = svg.append('g')
        .attr('transform',
          `translate(${(this.width / 2 - (5 * 2))}, ${this.height - ((this.rectHeight * 3) * 2)})`
        );

      if (!!data.parents[0]) {
        const singleParent1G = parentsG.append('g');

        left ?
          this.createCircleWithImage(singleParent1G, data.parents[0], this.rectWidth * 2 + 25)
          :
          this.createCircleWithImage(singleParent1G, data.parents[0], 25)

        singleParent1G.append('text')
          .datum(data.parents[0])
          .attr('x', left ? (this.rectWidth * 2 - this.nameMargin) : 0 - this.nameMargin)
          .attr('y', this.rectHeight - this.nameMarginBottom)
          .text(d => d.name);

        singleParent1G.append('text')
          .datum(data.parents[0])
          .attr('class', 'birthday')
          .attr('x', left ? (this.rectWidth * 2 - this.nameMargin) : 0 - this.nameMargin)
          .attr('y', this.rectHeight)
          .text(d => d.birthday);
      }
      if (!!data.parents[1]) {
        const singleParent2G = parentsG.append('g');

        left ?
          this.createCircleWithImage(singleParent2G, data.parents[1], ((left ? this.rectWidth * 2 : 0) + this.rectWidth * 2) + 25)
          :
          this.createCircleWithImage(singleParent2G, data.parents[1], ((left ? this.rectWidth * 2 : 0) - this.rectWidth * 2) + 25);

        singleParent2G.append('text')
          .datum(data.parents[1])
          .attr('x', left ?
            ((left ? this.rectWidth * 2 : 0) + this.rectWidth * 2) - this.nameMargin
            : ((left ? this.rectWidth * 2 : 0) - this.rectWidth * 2) - this.nameMargin)
          .attr('y', this.rectHeight - this.nameMarginBottom)
          .text(d => d.name);

        singleParent2G.append('text')
          .datum(data.parents[1])
          .attr('class', 'birthday')
          .attr('x', left ?
            ((left ? this.rectWidth * 2 : 0) + this.rectWidth * 2) - this.nameMargin
            : ((left ? this.rectWidth * 2 : 0) - this.rectWidth * 2) - this.nameMargin).attr('y', this.rectHeight)
          .attr('y', this.rectHeight)
          .text(d => d.birthday);
      }


    }
  }

  generateSiblings(svg, data: any, order: number) {
    if (!!this.data.marriedTo && order >= 1) {
      order++;
    }

    const siblingG = svg.append('g')
      .attr('transform',
        order % 2 !== 0 ? `translate(${(this.width / 2) + (this.rectWidth * (2 + order))}, ${this.height - (this.rectHeight * 3)})`
          : `translate(${(this.width / 2) - (order * this.rectWidth)}, ${this.height - (this.rectHeight * 3)})`);

    const siblingGroup = siblingG.append('g');
    this.createCircleWithImage(siblingGroup, data)

    siblingGroup.append('text')
      .attr('x', `-${this.rectWidth + this.nameMargin}`)
      .attr('y', this.rectHeight - this.nameMarginBottom)
      .text(data.name);

    siblingGroup.append('text')
      .datum(data)
      .attr('class', 'birthday')
      .attr('x', `-${this.rectWidth + this.nameMargin}`)
      .attr('y', this.rectHeight)
      .text(d => d.birthday);
  }

  generateChildren(svg, data: any) {
    for (let i = 0; i < this.data.children.length; i++) {
      const childrenG = svg.append('g')
        .attr('transform',
          i % 2 !== 0 ? `translate(${(this.width / 2) + (this.rectWidth * (2 + i))}, ${this.height - (this.rectHeight + 10)})`
            : `translate(${(this.width / 2) - (i * this.rectWidth) + 50}, ${this.height - (this.rectHeight + 10)})`);

      const childGroup = childrenG.append('g');

      this.createCircleWithImage(childGroup, data[i])

      childGroup.append('text')
        .attr('x', `-${this.rectWidth + this.nameMargin}`)
        .attr('y', this.rectHeight - this.nameMarginBottom)
        .text(data[i].name);

      childGroup.append('text')
        .datum(data[i])
        .attr('class', 'birthday')
        .attr('x', `-${this.rectWidth + this.nameMargin}`)
        .attr('y', this.rectHeight)
        .text(d => d.birthday);
    }



  }

  generatePartner(svg, data: any) {
    const partnerG = svg.append('g')
      .attr('transform',
        `translate(${(this.width / 2) + (3 * this.rectWidth) + 15}, ${this.height - (this.rectHeight * 3)})`
      );

    const partnerGroup = partnerG.append('g');

    this.createCircleWithImage(partnerGroup, data);
    this.createPaths(svg, this.data.id, data.id)

    partnerGroup.append('text')
      .attr('x', `-${this.rectWidth + this.nameMargin}`)
      .attr('y', this.rectHeight - this.nameMarginBottom)
      .text(data.name);

    partnerGroup.append('text')
      .datum(data)
      .attr('class', 'birthday')
      .attr('x', `-${this.rectWidth + this.nameMargin}`)
      .attr('y', this.rectHeight)
      .text(d => d.birthday);
  }

  generateParentSiblings(svg, data: any, left: boolean) {
    const siblingsG = svg.append('g')
      .attr('transform',
        `translate(${(this.width / 2) + 85}, ${this.height - (this.rectHeight * 4.5)})`
      );

    for (let i = 0; i < data.length; i++) {
      const siblingG = siblingsG.append('g');

      left ?
        this.createCircleWithImage(siblingG, data[i], -(100 * (i + 2)) + 25)
        :
        this.createCircleWithImage(siblingG, data[i], (85 * (i + 1)) + 25)



      siblingG.append('text')
        .datum(data[i])
        .attr('x', (left ? -(105 * (i + 2)) + this.nameMargin : (85 * (i + 1)) - this.nameMargin))
        .attr('y', this.rectHeight - this.nameMarginBottom)
        .text(d => d.name);

      siblingG.append('text')
        .datum(data[i])
        .attr('class', 'birthday')
        .attr('x', (left ? -(105 * (i + 2)) + this.nameMargin : (85 * (i + 1)) - this.nameMargin))
        .attr('y', this.rectHeight)
        .text(d => d.birthday);
    }


  }

  createCircleWithImage(group, character, customCx?: number) {
    group.append('circle')
      .attr('id', 'char' + character.id)
      .attr('cx', customCx ? customCx : `-${this.rectWidth / 2}`)
      .attr('r', 20)
      .attr('cy', 10)
      .attr('width', this.rectWidth)
      .attr('height', this.rectHeight)
      .attr('fill', 'cyan')
      .attr('stroke', 'black')
  }

  createPaths(svg, firstCharId: number, secondCharId: number) {
    const firstCharCircle = d3.select('#char' + firstCharId).node() as any;
    const secondCharCircle = d3.select('#char' + secondCharId).node() as any;

    svg.append('rect')
      .attr('fill', 'red')
      .attr('width', 100)
      .attr('height', 50)
      .attr('y', 10)
      .attr('x', 10)
    console.log("firstCharCircle B Box: ", firstCharCircle.getBBox())
    console.log("secondCharCircle B Box: ", secondCharCircle.getBBox())

    // console.log("secondCharCircle: ", secondCharCircle.getBoundingClientRect())



  }
}
