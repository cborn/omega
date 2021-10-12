import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AuthenticatedHttpClient} from '../../../../../../services/authenticated-http-service.service';
import * as d3 from 'd3';

declare const $;

@Component({
    selector: 'app-pitch-render',
    templateUrl: './pitch-render.component.html',
    styleUrls: ['./pitch-render.component.css']
})
export class PitchRenderComponent implements OnChanges {

    loading = false;

    @Input() modelId: string;
    @Input() recordingId: string;
    @Input() duration: number;
    @Input() questionId: number;



    private audioAnalysis: any;

    width = 800;
    height = 500;
    margin = {top: 20, right: 20, bottom: 30, left: 50};


// set the ranges
    x = d3.scaleLinear().range([0, this.width]);
    y = d3.scaleLinear().range([this.height, 0]);

    // define the line
    // model - green
    valueline = d3.line().defined(function (d) {
        return d['model'] !== 0;
    })
        .x(d => this.x(d['start']))
        .y(d => this.y(d['model']));

    // define the line
    // student - blue
    valueline2 = d3.line().defined(function (d) {
        return d['student'] !== 0;
    })
        .x((d) => this.x(d['start']))
        .y((d) => this.y(d['student']));

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    svg;


    constructor(private http: AuthenticatedHttpClient) {

    }


    draw(data) {


        this.svg = d3.select('#svg-container').append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g').attr('transform',
                'translate(' + this.margin.left + ',' + this.margin.top + ')');

        data = data[1];

        // format the data
        data.forEach(function (d) {
            d.start = +d.start;
            d.model = +d.model;
            d.student = +d.student;
        });

        // sort years ascending

        // Scale the range of the data
        // @ts-ignore
        this.x.domain(d3.extent(data, (d) => d.start));
        // @ts-ignore
        this.y.domain([0, d3.max(data, (d) => d.model)]);

        // Add the valueline path.
        this.svg.append('path')
            .data([data])
            .attr('class', 'line')
            .attr('d', this.valueline)
            .attr('id', 'valueline1');
        // Add the valueline path.
        this.svg.append('path')
            .data([data])
            .attr('class', 'line')
            .attr('d', this.valueline2);

        const rectangle = this.svg.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('fill', 'none')
            .attr('stroke', 'black');


        // Add the X Axis
        this.svg.append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(this.x));

        // Add the Y Axis
        this.svg.append('g')
            .call(d3.axisLeft(this.y));
        d3.select('.domain')
            .remove();


        this.svg.append('text')
            .attr('transform', 'translate(' + (this.width - 100) + ',' + (this.height - 40) + ')')
            .attr('dy', '.5em')
            .attr('text-anchor', 'start')
            .style('fill', 'none')
            .style('font-size', '20px')
            .text('Model');

        this.svg.append('text')
            .attr('transform', 'translate(' + (this.width - 100) + ',' + (this.height - 20) + ')')
            .attr('dy', '.5em')
            .attr('text-anchor', 'start')
            .style('fill', 'none')
            .style('font-size', '20px')
            .text('Student');

        this.loading = false;
    }

// Get the data


    async loadData() {

        $('#svg-container>svg').remove();
        this.loading = true;

        const dataToSend = {
            student: this.recordingId,
            model: this.modelId
        };

        const promise = await this.http.post(AuthenticatedHttpClient.COMPARE_PITCHES, dataToSend);

        promise.subscribe(data => {
            this.audioAnalysis = data;
            this.draw(this.audioAnalysis);

        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.loadData();
    }


}
