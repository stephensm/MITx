var data = [4,8,8,15,16,23,42]

var outerWidth=300;
var outerHeight=300;

var margin={top:20, right:20,bottom:20,left:20};
var cw=outerWidth-margin.left-margin.right;
var ch=outerHeight-margin.top-margin.bottom;

xscale=d3.scale.ordinal().domain(d3.keys(data)).rangeBands([0,cw]);
yscale=d3.scale.linear().domain([0,d3.max(data)]).range([ch,0]);

var chart=d3.select(".chart-container").append("svg").attr("class","chart")
.attr("height",outerHeight).attr("width",outerWidth).append("g").attr("transform","translate("+margin.left + "," +margin.top+")");;


chart.selectAll("line").data(yscale.ticks(10))
.enter().append("line")
.attr("x1",0)
.attr("x2",cw)
.attr("y1",yscale)
.attr("y2",yscale)

chart.selectAll("ylabel").data(yscale.ticks(10)).enter().append("text")
.attr("classe","ylabel")
.text(function(d){return d;})
.attr("x",0)
.attr("y",yscale)
.attr("dy","0.3em")
.attr("dx",-margin.left/8)
.attr("text-anchor","end")
.text(String)



chart.selectAll("rect").data(data).enter().append("rect")
.attr("x",function(d,i){return xscale(i);})
.attr("y",yscale)
.attr("width",xscale.rangeBand()).attr("height",function(d){return ch-yscale(d);})


chart.selectAll(".bar-label").data(data).enter().append("text")
.attr("class", "bar-label")
.text(function(d){return d;})
.attr("x",function(d,i){return xscale(i)+xscale.rangeBand()/2;})
.attr("y",function(d){return yscale(d)+margin.top/4;})
.attr("dy","0.7em")
.attr("text-anchor","middle");
