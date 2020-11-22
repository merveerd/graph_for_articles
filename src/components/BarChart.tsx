// eslint-disable
import * as d3 from "d3";
// import {select, Selection} from 'd3-selection';
import React, { useEffect, useState, useRef } from "react";
//import * as types from "../types";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
//import { Chart, Series, CommonSeriesSettings,  ZoomAndPan, Format,ArgumentAxis, Legend, Export, ScrollBar } from 'devextreme-react/chart';
import { articles } from "../articles";
//data redux olarak verilsin any guncelleme tetikletsin
import Button from './Button';

interface subArticle {
  [key: string]: any;
  'name': string;
  'frequency': number;
  '2009': number | undefined;
  '2010': number | undefined;
  '2011': number | undefined;
  '2012': number | undefined;
  '2013': number | undefined;
  '2014': number | undefined;
}

interface anagramData {
  [key: string]: number[]
}


interface Props {
  width: number;
  height: number;
}



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(4),
    minWidth: 120,
  },

}));

const orders = {
  ascending : 'Ascending',
  descending :'Descending'
}
export const BarChart: React.FC<Props> = ({ width, height }) => {

  const svgRef = useRef<SVGSVGElement>(null);
  const [mainData, setMainData] = useState<Array<subArticle>>([]);
  const [shownData, setShownData] = useState<Array<subArticle>>([]);

  const classes = useStyles();
  const [quantity, setQuantity] = React.useState<number>(50);
  const [orderDirection, setOrderDirection] = React.useState<string>(orders.ascending);

  const handleQuantity = (event: any) => {
    setQuantity(event.target.value);
  };


  useEffect(() => {
    let anagram: anagramData = {};
    let minPY: number = 90000000000;

    articles.forEach(item => {
      if (item.PY < minPY) {
        minPY = item.PY;
      }
    })

    articles.forEach(item => {
      item.tokens.forEach(token => {
        if (!(anagram[token.value])) {
          anagram[token.value] = [];
        }
        anagram[token.value][item.PY - minPY] = anagram[token.value][item.PY - minPY] + 1 || 1
      })
    });


    let newArray: Array<subArticle> = [];

    //setting the frequency and array from the object
    let freq: number = 0;
    for (var key in anagram) {
      freq = anagram[key].reduce((year1, year2) => {
        return (year1 + year2)
      }, 0);
      newArray.push({ 'name': key, 'frequency': freq, '2009': anagram[key][0] || 0, '2010': anagram[key][1] || 0, '2011': anagram[key][2] || 0, '2012': anagram[key][3] || 0, '2013': anagram[key][4] || 0, '2014': anagram[key][5] || 0 })
    }
    newArray = MergeSort(newArray, 'numeric');

    setMainData(newArray)

  }, []);

  useEffect(() => {
    setShownData(mainData.slice(0, quantity));

  }, [mainData]);

  useEffect(() => {

    if (shownData.length > 0) { //first render was an empty array
      draw();
    }
  }, [shownData])

  useEffect(() => {
    let graphSvg = document.getElementById('graph_svg')!;
   // console.log('svg',document.getElementById('graph_svg'))
    switch (quantity) {
      case (10):
        graphSvg.setAttribute('width', '600')
        break;
      case (50):
        graphSvg.setAttribute('width', '1800')
        break;
      case (100):
        graphSvg.setAttribute('width', '3600')
        break;
    }

    orderDirection === orders.ascending ? setShownData(mainData.slice(0, quantity)) :  setShownData(mainData.slice(-quantity))
 
  }, [quantity, orderDirection]);

  const draw = () => {
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current),
      margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var keys = Object.keys(shownData[0]).slice(0, Object.keys(shownData[0]).length - 2);

    var x0 = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);

    var x1 = d3.scaleBand()
      .padding(0.05);

    var y = d3.scaleLinear()
      .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    x0.domain(shownData.map(function (d) { return d.name; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(shownData, function (d) { return d3.max(keys, function (key) { return d[key]; }); })]).nice();

    g.append("g")
      .selectAll("g")
      .data(shownData)
      .enter().append("g")
      .attr("transform", function (d) { return "translate(" + x0(d.name) + ",0)"; })
      .selectAll("rect")
      .data(function (d) {
        let x = keys.map(function (key) { return { key: key, value: d[key] as number }; })

        return keys.map(function (key) { return { key: key, value: d[key] as number }; });
      })

      .enter().append("rect")
      .attr("x", function (d) {
        return x1(d.key) as number;
      })
      .attr("y", function (d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function (d) { return height - y(d.value); })
      .attr("fill", function (d) { return z(d.key) as number; });

    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0)).selectAll("text")
      .attr("y", 20)
      .attr("transform", "rotate(15)");

    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop() as number) - 8) //a bit higher than the max bar height's top
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Frequency");

    var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
      .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", width - 10)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z as any);

    legend.append("text")
      .attr("x", width - 15)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function (d) { return d; });
  }


  function MergeSort(items: Array<subArticle>, type:string): Array<subArticle> {
    return divide(items);
  }

  function divide(items: Array<subArticle>): Array<subArticle> {
    var halfLength = Math.ceil(items.length / 2);
    var low = items.slice(0, halfLength);
    var high = items.slice(halfLength);
    if (halfLength > 1) {
      low = divide(low);
      high = divide(high);
    }
    return combineNumerically(low, high);
  }

  function combineNumerically(low: Array<subArticle>, high: Array<subArticle>): Array<subArticle> {
    var indexLow = 0;
    var indexHigh = 0;
    var lengthLow = low.length;
    var lengthHigh = high.length;
    var combined = [];
    while (indexLow < lengthLow || indexHigh < lengthHigh) {
      var lowItem = low[indexLow];
      var highItem = high[indexHigh];
      if (lowItem !== undefined) {
        if (highItem === undefined) {
          combined.push(lowItem);
          indexLow++;
        } else {
          if (lowItem.frequency >= highItem.frequency) {
            combined.push(lowItem);
            indexLow++;
          } else {
            combined.push(highItem);
            indexHigh++;
          }
        }
      } else {
        if (highItem !== undefined) {
          combined.push(highItem);
          indexHigh++;
        }
      }
    }
    return combined;
  }


  const changeOrder = (event: any) => {
    setOrderDirection(event.target.value);
  }

  

  const styles = {
    container: {
      display: 'grid',
      justifyItems: 'center',
      height: '520',
      marginTop: '10vh',
      marginLeft: '40px',
      border: '2px solid black',
      overflow: 'auto'

    },
    main: {
      width: '100%',
      height: '100vh',
      overflow: 'scroll'

    }
  };

  return (
    <div style={styles.main}>
      <div style = {{display: 'flex', flexDirection : 'row', alignItems: 'center', justifyItems: 'center', position: "fixed", height: '10vh'}}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">quantity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={quantity}
          onChange={handleQuantity}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Change Order</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={orderDirection}
          onChange={changeOrder}
        >
          <MenuItem value={orders.ascending}>Ascending</MenuItem>
          <MenuItem value={orders.descending}>Descending</MenuItem>
        </Select>
      </FormControl>
      {/* <Button text='Change Order' onClick ={orderByAscendingNumber}></Button> */}
      </div>
      <svg ref={svgRef} id = 'graph_svg' width="1800" height="500" style={styles.container}>
      </svg>
    
    </div>

    // <div style={styles.container}>
    //   <svg ref={svgRef}></svg>
    //   <br />
    //   <button onClick={update}>Update</button>
    //   <br />
    //   <button onClick={removeLast}>Remove</button>
    // </div>
  );
};