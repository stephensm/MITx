var graphcalc = (function () {
    var exports = {};  // functions,vars accessible from outside
    function clear(canvas){
        var DOMcanvas = canvas[0];
        var ctx = DOMcanvas.getContext('2d');
        // x, y, w, h
    ctx.clearRect(0,0,canvas.width(),canvas.height());
    }
    function graph(canvas,expression,x1,x2) {
        clear(canvas);
        var w=canvas.width();
        var h=canvas.height();
        var DOMcanvas = canvas[0];    
        var ctx = DOMcanvas.getContext('2d');
        ctx.beginPath();
        try{
            var off=20;
            //calc values to plot
            var tree = calculator.parse(expression);
            var xtemp=x1;
            var y1=calculator.evaluate(tree,{e: Math.E, pi: Math.PI, x: x1});
            var ymin=y1;
            var ymax=y1;
    	    var dx=(x2-x1)/(w-2*off);
    	    var points=new Array();
        	while(xtemp<=x2){
                var y= calculator.evaluate(tree,{e: Math.E, pi: Math.PI, x: xtemp});
                ymax=Math.max(ymax,y);
                ymin=Math.min(ymin,y);
                var cords=[xtemp,y];
                points.push(cords);
            	xtemp=xtemp+dx;
            	}
            //plot values
            var dy=(ymax-ymin)/(h-2*off);
            ctx.beginPath();
            //ctx.moveTo(off+x1-x1,(h-off)-(y1-ymin)/dx);
            for (var i =0 ; i < points.length; i++) {
                if(i==0)
                {
                    ctx.moveTo(off+(xp-x1)/dx,h-off-(yp-ymin)/dy);
                }
                var xp=points[i][0];
                var yp=points[i][1];
                 ctx.lineTo(off+(xp-x1)/dx,h-off-(yp-ymin)/dy);
            }
            ctx.lineWidth=10;
            ctx.strokeStyle="red";
            ctx.lineCap="round";
            ctx.lineJoin="round";
            ctx.stroke();
            
            //draw axis
            ctx.beginPath();
            var axoff=5;
            ctx.moveTo(axoff,axoff);
            ctx.lineTo(axoff,h-axoff);
            ctx.lineTo(w-axoff,h-axoff);
            ctx.lineWidth=3;
            ctx.strokeStyle="black";
            ctx.stroke();
            //determing sapcing
            var xspac=(x2-x1)/5;
            var yspac=(ymax-ymin)/5;
            ctx.beginPath();
            var yspace=(h-2*axoff)/5;
            var xspace=(w-2*axoff)/5;
            var power=10;
            for(var j=0; j<5;j++){
                ctx.moveTo(axoff,j*yspace+axoff);
                ctx.lineTo(axoff*2,j*yspace+axoff);
                var yval=Math.round((ymax-j*yspac)*power)/power;  
                ctx.fillText(yval,axoff*2,j*yspace+axoff);
                
                ctx.moveTo(j*xspace+axoff,h-axoff);
                ctx.lineTo(j*xspace+axoff ,h-2*axoff);
                var xval=x1+Math.round(j*xspac*power)/power;
                ctx.fillText(xval,j*xspace+axoff ,h-2*axoff);
            }
            ctx.lineWidth=1;
            ctx.strokeStyle="black";
            ctx.lineCap="round";
            ctx.lineJoin="round";
            ctx.stroke();
        }
        catch(err){
            ctx.beginPath();
            ctx.fillStyle="red";
            ctx.font="20px Georgia";
            ctx.textAlign="center";
            ctx.textBaseline="middle";
            ctx.fillText(err.message,100,100);
        }
 
 
            
            
    	
    }
    
    function setup(div) {

    	var back=$('<div id="back">'); 
     	var JQcanvas=$('<canvas id="art" width="400" height="400"></canvas>');
    	var r1=$('<div id="r1">'); 
    	var r2=$('<div id="r2">'); 
    	var r3=$('<div id="r3">'); 
    	var func=$('<input></input>',{type: "text1", size: 50});
    	var f=$('<lable>f(x): </lable>');
      	r1.append(f,func);
    	var mnx=$('<lable>min x: </lable>');
    	var xminin=$('<input></input>',{type: "text2", size: 50});
    	var mxx=$('<lable>max x: </lable>');
    	var xmaxin=$('<input></input>',{type: "text3", size: 50});
    	r2.append(mnx,xminin,mxx,xmaxin);
    	var but=$('<button>Plot</button>');
        but.bind("click",function(){graph(JQcanvas, func.val(),parseInt(xminin.val()),parseInt(xmaxin.val()))});
        r3.append(but);
    	back.append(JQcanvas,r1,r2,r3);
    	$(div).append(back);



    }
    exports.setup = setup;
    return exports;
}());
// setup all the graphcalc divs in the document
$(document).ready(function() {
    $('.graphcalc').each(function() {
        graphcalc.setup(this);  
    });
});