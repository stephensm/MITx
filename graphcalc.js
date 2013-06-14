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
        expression=expression.replace(/\xF7/g,"/");
        expression=expression.replace(/\xD7/g,"*");
        expression=expression.replace(/\u221A/g,"sqrt");
        
        
        //n=expression.replace(/\xF7/g,"/");

        try{
            var off=20;
            //calc values to plot
            var tree = calculator.parse(expression);
            var xtemp=x1;
            if(isNaN(x1) || isNaN(x2)){
                var y1=calculator.evaluate(tree,{e: Math.E, pi: Math.PI,});
                ctx.beginPath();
                ctx.fillStyle="red";
                ctx.font="20px Georgia";
                ctx.textAlign="center";
                ctx.textBaseline="middle";
                ctx.fillText(y1,100,100);
            
            }
        else{
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
        var cav=$('<div id="cav">'); 
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
        cav.append(JQcanvas)
    	back.append(cav,r1,r2,r3);
        var text="";
        var row =$('<div id=row1>');
        var buttonA=$('<button class="calcbutton">(</button>');
        buttonA.bind("click",function(){
            text=func.val()+ "(";
            func.val(text);});
        var buttonB=$('<button class="calcbutton">)</button>');
        buttonB.bind("click",function(){
            text=text+ ")";
            func.val(text);});
        var buttonC=$('<button class="calcbutton">\u221A</button>');
        buttonC.bind("click",function(){
            text= func.val()+"\u221A" +" (";
            func.val(text);});
        var buttonD=$('<button class="calcbutton">X</button>');
        buttonD.bind("click",function(){
            text=func.val()+ "x";
            func.val(text);});
        
        
        var button1=$('<button class="calcbutton">Cos</button>');
        button1.bind("click",function(){
            text=func.val()+ "cos(";
            func.val(text);});
        var button2=$('<button class="calcbutton">Sin</button>');
        button2.bind("click",function(){
            text=func.val()+ "sin(";
            func.val(text);});
        var button3=$('<button class="calcbutton">Tan</button>');
        button3.bind("click",function(){
            text=func.val()+ "tan(";
            func.val(text);});
        var button4=$('<button class="calcbutton">^</button>');
        button4.bind("click",function(){
            text=func.val()+ "^";
            func.val(text);});
        
        var row1=$('<div id=row1>');
        var button5=$('<button class="calcbutton">C</button>');
        button5.bind("click",function(){
            text="";
            func.val(text);});
        var button6=$('<button class="calcbutton">\xB1</button>');
        button6.bind("click",function(){
            text="-"+func.val();
            func.val(text);});
        var button7=$('<button class="calcbutton">&divide</button>');
        button7.bind("click",function(){
            text=func.val()+ "\xF7";
            func.val(text);});
        var button8=$('<button class="calcbutton">&times</button></div>');
        button8.bind("click",function(){
            text=func.val()+"\xD7";
            func.val(text);});
        var row2=$('<div id="row2">');
        var button9=$('<button class="calcbutton">7</button>');
        button9.bind("click",function(){
            text=func.val()+"7";
            func.val(text);});
        var button10=$('<button class="calcbutton">8</button>');
        button10.bind("click",function(){
            text=func.val()+"8";
            func.val(text);});
        var button11=$('<button class="calcbutton">9</button>');
        button11.bind("click",function(){
            text=func.val()+"9";
            func.val(text);});
        var button12=$('<button class="calcbutton">-</button></div>');
        button12.bind("click",function(){
            text=func.val()+"-";
            func.val(text);});
        var row3=$('<div id="row3">');
        var button13=$('<button class="calcbutton">4</button>');
        button13.bind("click",function(){
            text=func.val()+"4";
            func.val(text);});
        var button14=$('<button class="calcbutton">5</button>');
        button14.bind("click",function(){
            text=func.val()+"5";
            func.val(text);});
        var button15=$('<button class="calcbutton">6</button>');
        button15.bind("click",function(){
            text=func.val()+"6";
            func.val(text);});
        var button16=$('<button class="calcbutton">+</button></div>');
        button16.bind("click",function(){
            text=func.val()+"+";
            func.val(text);});
        var row4=$('<div id="row4">');
        var button17=$('<button class="calcbutton">1</button>');
        button17.bind("click",function(){
            text=func.val()+"1";
            func.val(text);});
        var button18=$('<button class="calcbutton">2</button>');
        button18.bind("click",function(){
            text=func.val()+"2";
            func.val(text);});
        var button19=$('<button class="calcbutton">3</button></div>');
        button19.bind("click",function(){
            text=func.val()+"3";
            func.val(text);});
        var row5=$('<div id="row5">');
        var button21=$('<button class="zerobut">0</button>');
        button21.bind("click",function(){
            text=func.val()+"0";
            func.val(text);});
        var button22=$('<button class="calcbutton">.</button></div>');
        button22.bind("click",function(){
            text=func.val()+".";
            func.val(text);});
        var button20=$('<button class="eqbut">=</button>');
        button20.bind("click",function(){graph(JQcanvas, func.val(),parseInt(xminin.val()),parseInt(xmaxin.val()))});
        var row6=$('<div id="row6">');
    
        var row=$('<div id="row">');
        row.append(buttonA,buttonB,buttonC,buttonD);
        row1.append(button1,button2,button3,button4);
        row2.append(button5,button6,button7,button8);
        row3.append(button9,button10,button11,button12);
        row4.append(button13,button14,button15,button16);
        row5.append(button17,button18,button19,button20);
        row6.append(button21,button22);
        back.append(row,row1,row2,row3,row4,row5,row6);
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