import * as d3 from 'd3';
import { ArticleData } from '../models/models';
export const draw = (
  shownData: ArticleData,
  svgRef: React.RefObject<SVGSVGElement>
) => {
  d3.select(svgRef.current).selectAll('*').remove();

  const svg = d3.select(svgRef.current),
    margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = +svg.attr('width') - margin.left - margin.right,
    height = +svg.attr('height') - margin.top - margin.bottom,
    g = svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var keys = Object.keys(shownData[0]).slice(
    0,
    Object.keys(shownData[0]).length - 2
  );

  var x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);

  var x1 = d3.scaleBand().padding(0.05);

  var y = d3.scaleLinear().rangeRound([height, 0]);

  var z = d3
    .scaleOrdinal()
    .range([
      '#98abc5',
      '#8a89a6',
      '#7b6888',
      '#6b486b',
      '#a05d56',
      '#d0743c',
      '#ff8c00',
    ]);
  x0.domain(
    shownData.map(function (d) {
      return d.name;
    })
  );
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([
    0,
    d3.max(shownData, function (d) {
      return d3.max(keys, function (key) {
        return d[key];
      });
    }),
  ]).nice();

  g.append('g')
    .selectAll('g')
    .data(shownData)
    .enter()
    .append('g')
    .attr('transform', function (d) {
      return 'translate(' + x0(d.name) + ',0)';
    })
    .selectAll('rect')
    .data(function (d) {
      let x = keys.map(function (key) {
        return { key: key, value: d[key] as number };
      });

      return keys.map(function (key) {
        return { key: key, value: d[key] as number };
      });
    })

    .enter()
    .append('rect')
    .attr('x', function (d) {
      return x1(d.key) as number;
    })
    .attr('y', function (d) {
      return y(d.value);
    })
    .attr('width', x1.bandwidth())
    .attr('height', function (d) {
      return height - y(d.value);
    })
    .attr('fill', function (d) {
      return z(d.key) as number;
    });

  g.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x0))
    .selectAll('text')
    .attr('y', 20)
    .attr('transform', 'rotate(15)');

  g.append('g')
    .attr('class', 'axis')
    .call(d3.axisLeft(y).ticks(null, 's'))
    .append('text')
    .attr('x', 2)
    .attr('y', y(y.ticks().pop() as number) - 8) //a bit higher than the max bar height's top
    .attr('dy', '0.32em')
    .attr('fill', '#000')
    .attr('font-weight', 'bold')
    .attr('text-anchor', 'start')
    .text('Frequency');

  var legend = g
    .append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('text-anchor', 'end')
    .selectAll('g')
    .data(keys.slice().reverse())
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
      return 'translate(0,' + i * 20 + ')';
    });

  legend
    .append('rect')
    .attr('x', width - 10)
    .attr('width', 19)
    .attr('height', 19)
    .attr('fill', z as any);

  legend
    .append('text')
    .attr('x', width - 15)
    .attr('y', 9.5)
    .attr('dy', '0.32em')
    .text(function (d) {
      return d;
    });
};
