var outerWidth=300;
var outerHeight=300;

var margin={top:20, right:20,bottom:20,left:20};
var cw=outerWidth-margin.left-margin.right;
var ch=outerHeight-margin.top-margin.bottom;

var stack=d3.layout.stack();
var stackedData=stack(data);
var ystackmax=d3.max(stackedData,function(layer){return d3.max(layer,function(d){return d.y+d.y0})});
var ygroupmax=d3.max(stackedData,function(layer){return d3.max(layer,function(d){return d.y})});


var xscale=d3.scale.ordinal().domain(d3.range(data[0].length)).rangeBands([0,cw]);
var yscale=d3.scale.linear().domain([0,ystackmax]).range([ch,0]);

var chart=d3.select(".chart-container").append("svg")
.attr("class","chart")
.attr("height",outerHeight)
.attr("width",outerWidth)
.append("g")
.attr("transform","translate("+margin.left + "," +margin.top+")");


chart.selectAll("line").data(yscale.ticks(10))
.enter().append("line")
.attr("x1",0)
.attr("x2",cw)
.attr("y1",yscale)
.attr("y2",yscale);

chart.selectAll("ylabel").data(yscale.ticks(10)).enter().append("text")
.attr("classe","ylabel")
.text(function(d){return d;})
.attr("x",0)
.attr("y",yscale)
.attr("dy","0.3em")
.attr("dx",-margin.left/8)
.attr("text-anchor","end")
.text(String);

var layergroups=chart.selectAll(".layer").data(stackedData).enter().append("g")
.attr("class", "layer");

 var rects=layergroups.selectAll("rect").data(function(d){return d;}).enter().append("rect")
 .attr("x",function(d,i){return xscale(i);})
 .attr("y",function(d){return yscale(d.y0+d.y);})
.attr("width",xscale.rangeBand())
 .attr("height",function(d){return yscale(d.y0)-yscale(d.y0+d.y);});

function goGrouped(){
    yscale.domain([0,ygroupmax]);
    rects.transition()
    .duration(1000)
    .delay(function(d,i){return i*20;})
    .attr("x",function(d,i,j)
          {return xscale(i)+xscale.rangeBand()/stackedData.length*j})
    .attr("width",xscale.rangeBand()/stackedData.length)
    .transition()
    .attr("y",function(d){return yscale(d.y)})
    .attr("height",function(d){return ch-yscale(d.y);});
    
}



