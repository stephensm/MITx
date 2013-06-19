var data = [0,4,8,8,15,16,23,42]

var ch=300;
var cw=300;
xscale=d3.scale.ordinal().domain(d3.keys(data)).rangeBands([0,cw]);
yscale=d3.scale.linear().domain([0,d3.max(data)]).range([0,ch]);

var chart=d3.select(".chart-container").append("svg").attr("class","chart")
.attr("height",ch).attr("width",cw);

chart.selectAll("rect").data(data).enter().append("rect")
.attr("x",function(d,i){return xscale(i);})
.attr("y",function(d){return ch-yscale(d);})
.attr("width",xscale.rangeBand()).attr("height",yscale);

chart.selectAll("text").data(data).enter().append("text")
.text(function(d){return d;})
.attr("x",function(d,i){return xscale(i)+xscale.rangeBand()/2;})
.attr("y",function(d){return ch-yscale(d)+3;})
.attr("dy","0.7em")
.attr("text-anchor","middle");

