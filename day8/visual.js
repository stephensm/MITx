var data = [0,4,8,8,15,16,23,42]

var ch=140;
yscale=d3.scale.ordinal().domain(d3.keys(data)).rangeBands([0,ch]);
xscale=d3.scale.linear().domain([0,d3.max(data)]).range(["0%","100%"]);

var chart=d3.select(".chart-container").append("svg").attr("class","chart");
chart.selectAll("rect").data(data).enter().append("rect").attr("y",function(d,i){return yscale(i);}).attr("width",xscale).attr("height",20);

chart.selectAll("text").data(data).enter().append("text")
.text(function(d){return d;})
.attr("y",function(d,i){return yscale(i)+yscale.rangeBand()/2;})
.attr("x",xscale)
.attr("dy","0.35em")
.attr("dx",-3)
.attr("text-anchor","end");