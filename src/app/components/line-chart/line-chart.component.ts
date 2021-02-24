import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../../services/data.service';
import { CryptoObj } from '../../models/CryptoObj';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  data:CryptoObj;
  coin:string;

  constructor(private dataService:DataService,public chartElem: ElementRef) { }

  ngOnInit(): void {
    this.coin = "BitCoin";
    this.dataService.getCryptoData('?fsym=BTC').subscribe(data => {
      this.data = data;
      console.log(this.data.Response);

      
      console.log(this.data)
      this.lineColour = "blue";
      this.initializeChart();
      this.drawChart();

      window.addEventListener('resize', () => this.drawChart());
    });
  }

  /* Create the Line Graph here */
  
  private width:number = 700;
  private height:number = 700;
  private margin:number = 50;
  private lineColour:string;

  public svg:any;
  public svgInner:any;
  public yScale:any;
  public xScale:any;
  public xAxis:any;
  public yAxis:any;
  public lineGroup:any;

  private initializeChart(): void {
    this.svg = d3
      .select('figure#line')
      .append('svg')
      .attr('height', this.height);
      
    this.svgInner = this.svg
      .append('g')
      .style('transform', 'translate(' + this.margin + 'px, ' + this.margin + 'px)');

    this.svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", this.width)
      .attr("y", this.height - 6)
      .text("Time (Hours & Minutes)");

    this.svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 10)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Price at the start of each period of time in USD($)");
      
    this.yScale = d3
      .scaleLinear()
      .domain([d3.max(this.data.Data.Data, d => d.open) as number + 2000, d3.min(this.data.Data.Data, d => d.open) as number - 2000])
      .range([0, this.height - 2 * this.margin]);

    this.yAxis = this.svgInner
      .append('g')
      .attr('id', 'y-axis')
      .style('transform', 'translate(' + this.margin + 'px,  0)');

    this.xScale = d3.scaleTime().domain(<[Date, Date]>d3.extent(this.data.Data.Data, d => new Date(d.time)));

    this.xAxis = this.svgInner
      .append('g')
      .attr('id', 'x-axis')
      .style('transform', 'translate(0, ' + (this.height - 2 * this.margin) + 'px)');

    this.lineGroup = this.svgInner
      .append('g')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'none')
      .style('stroke', this.lineColour)
      .style('stroke-width', '2px')
  }

  private drawChart(): void {
    this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
    this.svg.attr('width', this.width);

    this.xScale.range([this.margin, this.width - 2 * this.margin]);

    const xAxis = d3
      .axisBottom(this.xScale)
      .ticks(10);

    this.xAxis.call(xAxis);

    const yAxis = d3
      .axisLeft(this.yScale);

    this.yAxis.call(yAxis);

    const line = d3
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(d3.curveMonotoneX);

    const points: [number, number][] = this.data.Data.Data.map(d => [
      this.xScale(new Date(d.time)),
      this.yScale(d.open),
    ]);

    this.lineGroup.attr('d', line(points));
  }

  radioChangeHandler (event:any) {
    console.log(event);
    if (event.target.value === "bit") {
      this.coin = "BitCoin";
      this.lineColour = "blue"

      this.svg = d3
      .select("svg").remove();
      this.dataService.getCryptoData('?fsym=BTC').subscribe(data => {
        this.data = data;
        this.initializeChart();
        this.drawChart();
      });
    }
    if (event.target.value === "eth") {
      this.coin = "Ethereum";
      this.lineColour = "red"

      this.svg = d3
      .select("svg").remove();
      this.dataService.getCryptoData('?fsym=ETH').subscribe(data => {
        this.data = data;
        this.initializeChart();
        this.drawChart();
      });
    }
  }
  
}
