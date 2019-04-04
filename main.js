function createDataset(){
  var dataset = []
  for (var x = 0; x <= (Math.random() * 100) + 10; x++){
    var num = Math.round(Math.random() * 100);
    dataset.push(num);
  }
  return dataset;
}

var initialize = function(){
  var dataset = createDataset();
  console.log(dataset);
  var screen = {
    width: 600,
    height: 500
  }
  var margins = {
    top: screen.height*0.2,
    bottom:screen.height*0.05,
    left:screen.width*0.05,
    right:screen.width*0.3
  }
  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;
  var svg = d3.select('body')
              .append('svg')
              .attr('width', screen.width)
              .attr('height', screen.height);
  var xScale = d3.scaleLinear()
                 .domain([1, dataset.length])
                 .range([margins.left, width])
  var xAxis = d3.axisTop(xScale)
                .ticks(dataset.length)
  var yScale = d3.scaleLinear()
                 .domain([0, d3.max(dataset)])
                 .range([height, margins.top])
  var yAxis = d3.axisRight(yScale)
                .ticks(10)
  // CREATES AREA GRAPH //

  var drawArea = d3.area()
                   .x(function(d, i){ return xScale(i); })
                   .y0(height)
                   .y1(function(d){ return yScale(d); })

  var area_graph = svg.append('g')
                 .append('path')
                 .datum(dataset)
                 .attr('d', drawArea)
                 .attr('fill', 'black')
                 .attr('transform', 'translate(' + margins.left + ',0)')
                 .classed('hidden', true);

  // CREATES AREA GRAPH //

  var dots = svg.append('g')
                .selectAll('circle')
               .data(dataset)
               .enter()
               .append('circle')
               .classed('dots', true)
               .attr('cx', function(d, i){
                 return xScale(i);
               })
               .attr('cy', function(d){
                 return yScale(d)
               })
               .attr('r', 5)
               .attr('transform', 'translate(' + margins.left + ',0)')
               .attr('fill', 'red')

  // CREATES LINE GRAPH //
  var drawLine = d3.line()
                   .x(function(d, i){ return xScale(i) })
                   .y(function(d){ return yScale(d)})
                   .curve(d3.curveMonotoneX)
  var line_graph = svg.append('g')
                 .append('path')
                 .datum(dataset)
                 .attr('d', drawLine)
                 .attr('stroke-width', 5)
                 .attr('stroke', 'black')
                 .attr('fill', 'none')
                 .attr('transform', 'translate(' + margins.left + ',0)')
  // CREATES LINE GRAPH //


  svg.append('g')
     .classed('XAxis', true)
     .attr('transform', 'translate(' + 0 + ',' + ((height + margins.bottom)) + ')')
     .call(xAxis)

  svg.append('g')
     .classed('yAxis', true)
     .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
     .call(yAxis)

  var texts = [
    ['Line Graph'],
    ['Area Graph']
  ]
  var text_objs = svg.append('g')
      .classed('ToggleTexts', true)
      .selectAll('text')
      .data(texts)
      .enter()
      .append('text')
      .attr('x', function(d, i){ return (width * 1/3) * (i + 1); })
      .attr('y', margins.top * 0.5)
      .text(function(d){ return d; })
      .on('click', function(d){
        if (d[0] == "Line Graph"){
          line_graph.classed('hidden', false);
          area_graph.classed('hidden', true);
        }else{
          console.log("Area graph.")
          line_graph.classed('hidden', true);
          area_graph.classed('hidden', false);
        }
      })


}

initialize();
