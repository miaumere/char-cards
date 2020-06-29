import { IHistoricalPreference } from './../../../../../models/historical-preference.model';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/core/base.component';

import * as d3 from 'd3';
import * as moment from 'moment';
import { tree, hierarchy, Link, DefaultLinkObject, linkHorizontal, line, select, linkVertical } from 'd3';



@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.scss']
})
export class FamilyTreeComponent extends BaseComponent implements OnInit {
  @ViewChild('familyTree')
  private chartContainer: ElementRef;

  private treeData: any = {
    name: 'Micet Maske',
    children:
      [
        {
          name: 'Valentin Maske',
          children:
            [
              { name: 'Theodor Maske' },
              { name: 'Angela Maske' },

            ]
        },

        {
          name: 'Lotta Maske',
          children:
            [
              { name: 'Adelheid Kohler' },
              { name: 'Wolfgang Kohler' },
            ]
        },

      ]
  };


  constructor(
    private _translate: TranslateService,
    private _activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    setTimeout(() => {
      this.chartContainer = this.chartContainer;
      this.createChart();
    }, 0);

  }


  createChart() {
    const svgWidth = this.chartContainer.nativeElement.offsetWidth;
    const height = 600;
    const treeWidth: number = svgWidth - 50;
    const treeHeight: number = height - 50;
  }


  // createChart() {
  //   const svgWidth = this.chartContainer.nativeElement.offsetWidth;
  //   const height = 600;
  //   const treeWidth: number = svgWidth - 50;
  //   const treeHeight: number = height - 50;

  //   const treeMain = tree()
  //     .size([svgWidth, treeWidth - 300])
  //     .separation(function (a, b) {
  //       return (a.parent === b.parent) ? 1 : 2;
  //     });


  //   const hierarchyData = hierarchy(this.treeData).sum(function (d) {
  //     return d.value;
  //   });

  //   // This is written to let the data be displayed horizontally x, y interchange
  //   const renderLink: Link<any, DefaultLinkObject, [number, number]> = linkVertical().y(function (d: any) {
  //     return d.y;
  //   }).x(function (d: any) {
  //     return d.x;
  //   });

  //   const lineMain = line();
  //   const element = this.chartContainer?.nativeElement;

  //   // Create svg
  //   const svg = select(element)
  //     .append('svg')
  //     .attr('width', treeWidth)
  //     .attr('height', treeHeight)
  //     .append('g')
  //   // .attr('transform', 'translate(30, 0)');

  //   const g = svg.append('g').attr('transform', 'translate(0, 40)');


  //   treeMain(hierarchyData);
  //   const nodes = hierarchyData.descendants();
  //   const links = hierarchyData.links();


  //   // draw a line
  //   g.selectAll('.link')
  //     .data(links)
  //     .enter()
  //     .append('path')
  //     .attr('class', 'link')
  //     .attr('fill', 'none') // This is the default fill color
  //     .attr('stroke', '#000') // give a frame fill color of your own
  //     .attr('d', function (d: any) {
  //       return renderLink(d);
  //     });

  //   // draw the node
  //   g.selectAll('.node')
  //     .data(nodes)
  //     .enter()
  //     .append('g')
  //     .attr('class', 'node')
  //     .attr('transform', function (d: any) { // This is written to let the data be displayed horizontally
  //       return `translate(${d.x}, ${d.y})`;
  //     });

  //   g.selectAll('.node').append("text")
  //     .attr("y", function (d: any) {
  //       return d.children || d._children ? -18 : 18;
  //     })
  //     .attr("dy", ".35em")
  //     .attr("text-anchor", "middle")
  //     .text(function (d: any) { return d.data.name; })
  //     .style("fill-opacity", 1);


  //   // g.selectAll('.node')
  //   //   .append('text')
  //   //   .attr('dx', 3)
  //   //   .attr('y', function (d: any) {
  //   //     return d.children ? -8 : 8;
  //   //   })
  //   //   .attr('text-anchor', function (d: any) {
  //   //     return d.children ? 'end' : 'start';
  //   //   })
  //   //   .text(function (d: any) {
  //   //     return d.data.name;
  //   //   })
  //   //   .style('font-size', '18px');

  // }

}
