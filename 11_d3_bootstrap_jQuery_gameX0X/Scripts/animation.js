var picture = {

		height: 50,
	    width: 50,
	    duration: 1000,

	    KContainer:{},

	    createSvg: function (i, j) {

            this.KContainer = d3.select('.animation' + i + j)
                    .append('svg')
                    .attr('height', +picture.height + 2 * feather.width)
                    .attr('width', +picture.width + 2 * feather.width)
                    .style('opacity', 1);
        }

	};	



var feather = {

    width: 10,
    thickness: 0.1,      // min = 0.1
    angle: 30,           // degree
    color: 'blue'

  };



var zeroCoordinateData = [[
                            { x: 217, y: 116 },
                            { x: 131, y: 390 },
                            { x: 324, y: 385 },
                            { x: 398, y: 88 },
                            { x: 329, y: 52 },
                            { x: 239, y: 93 }
                        ]];


var crossCoordinateData = [[
                            { x: 0, y: 0 },
                            { x: 50, y: 50 }
                        ],[
                            { x: 50, y: 0 },
                            { x: 0, y: 50 }
                        ]];



function myD3js_Visualization(i, j, CoordinateData) {

    if (CoordinateData === zeroCoordinateData) {
        feather.color = 'red';
        picture.duration = 1000;
    }
    else {
        feather.color = 'blue';
        picture.duration = 50;
    }
    picture.createSvg(i, j);
    var data= [];
    for (var q = 0; q < CoordinateData.length; q++) {
        data[q] = scaleData(CoordinateData[q]);
        createLines( data[q]);
        animate();
    }
}



function scaleData ( data1 ) {

  var maxX=0, minX=100000, maxY=0, minY=100000;
  data1.forEach(function(d) {
    if(+d.x > maxX) maxX = +d.x;
    if(+d.x < minX) minX = +d.x;
    if(+d.y > maxY) maxY = +d.y;
    if(+d.y < minY) minY = +d.y;
  });

  var comingPicture = {
      height: maxY - minY,
      width: maxX - minX
  }

  var pictureProportion = comingPicture.width / comingPicture.height ;
  //picture.width = picture.height * pictureProportion;

  var scale = picture.height / comingPicture.height;

  data1.forEach(function(d) {
    d.x = (+d.x - minX) * scale + feather.width;
    d.y = (+d.y - minY) * scale + feather.width;   
  });

  return data1;
}



function createLines ( data ) {

  var traceQuantity = (Math.round( +feather.width / +feather.thickness) + 1) * 2;

  var xOffset = +feather.width * Math.cos ( +feather.angle * Math.PI /180 );
  var yOffset = +feather.width * Math.sin ( +feather.angle * Math.PI /-180 );

  var trace = d3.svg.line()
        .x(function(d){return d.x;})
        .y(function(d){return d.y;})
        .interpolate("basis");

  for(j=0; j<traceQuantity; j++){

      var tempData = [];

      for(i=0; i<data.length; i++){
        tempData[i] = { 
          x:+data[i].x + j * xOffset / traceQuantity, 
          y:+data[i].y + j * yOffset / traceQuantity 
        };      
      }

    var traceGroup = picture.KContainer
              .append('g')
              .append('path')
              .attr("d", trace(tempData))   // binding data to lines
              .attr('fill', 'none')
              .style("stroke", feather.color)
              .style("stroke-linecap", "round")
              .style("stroke-width", +feather.thickness);
  }
}



function animate() {

    var totalLength = picture.KContainer
            .select('g')
            .selectAll('path')
            .node()
            .getTotalLength();

    picture.KContainer
        .selectAll('path')
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
            .duration(+picture.duration)
            .ease("linear")
            .attr("stroke-dashoffset", 0)
};