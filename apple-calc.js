function setup_calc(div){
    var text="";
    var ins=""
    var back=$('<div id="back">');
    var input=$('<input></input>',{type: "text", size: 50});
    var output=$('<div class="output"></div>');
    var button1=$('<button class="calcbutton">Cos</button>');
    var button2=$('<button class="calcbutton">Sin</button>');
    var button3=$('<button class="calcbutton">Tan</button>');
    var button4=$('<button class="calcbutton">X</button>');
    var row1=$('<div id=row1>');
    var button5=$('<button class="calcbutton">C</button>');
    button5.bind("click",function(){
        text="";
        ins="";
        input.val(text);});
    var button6=$('<button class="calcbutton">±</button>');
    button6.bind("click",function(){
        text="-"+text;
        ins="-"+ins;
        input.val(text);});
    var button7=$('<button class="calcbutton">&divide</button>');
    button7.bind("click",function(){
        text=text+ "\xF7";
        ins=ins+"/";
        input.val(text);});
    var button8=$('<button class="calcbutton">&times</button></div>');
    button8.bind("click",function(){
        text=text+"\xD7";
        ins=ins+"*";
        input.val(text);});
    var row2=$('<div id="row2">');
    var button9=$('<button class="calcbutton">7</button>');
    button9.bind("click",function(){
        text=text+"7";
        ins=ins+"7";
        input.val(text);});
    var button10=$('<button class="calcbutton">8</button>');
    button10.bind("click",function(){
        text=text+"8";
        ins=ins+"8";
        input.val(text);});
    var button11=$('<button class="calcbutton">9</button>');
    button11.bind("click",function(){
        text=text+"9";
        ins=ins+"9";
        input.val(text);});
    var button12=$('<button class="calcbutton">-</button></div>');
    button12.bind("click",function(){
        text=text+"-";
        ins=ins+"-";
        input.val(text);});
    var row3=$('<div id="row3">');
    var button13=$('<button class="calcbutton">4</button>');
    button13.bind("click",function(){
        text=text+"4";
        ins=ins+"4";
        input.val(text);});
    var button14=$('<button class="calcbutton">5</button>');
    button14.bind("click",function(){
        text=text+"5";
        ins=ins+"5";
        input.val(text);});
    var button15=$('<button class="calcbutton">6</button>');
    button15.bind("click",function(){
        text=text+"6";
        ins=ins+"6";
        input.val(text);});
    var button16=$('<button class="calcbutton">+</button></div>');
    button16.bind("click",function(){
        text=text+"+";
        ins=ins+"+";
        input.val(text);});
    var row4=$('<div id="row4">');
    var button17=$('<button class="calcbutton">1</button>');
    button17.bind("click",function(){
        text=text+"1";
        ins=ins+"1";
        input.val(text);});
    var button18=$('<button class="calcbutton">2</button>');
    button17.bind("click",function(){
        text=text+"2";
        ins=ins+"2";
        input.val(text);});
    var button19=$('<button class="calcbutton">3</button></div>');
    button19.bind("click",function(){
        text=text+"3";
        ins=ins+"3";
        input.val(text);});
    var row5=$('<div id="row5">');
    var button21=$('<button class="zerobut">0</button>');
    button21.bind("click",function(){
        text=text+"0";
        ins=ins+"0";
        input.val(text);});
    var button22=$('<button class="calcbutton">.</button></div>');
    button22.bind("click",function(){
        text=text+".";
        ins=ins+".";
        input.val(text);});
    var button20=$('<button class="eqbut">=</button>');
    button20.bind("click",function(){
        output.text(String(calculate(ins)));
        output.cc("visitility", "visible");});
    var row6=$('<div id="row6">');

    var row=$('<div id="row">');
    row.append(input,output);
    row1.append(button1,button2,button3,button4);
    row2.append(button5,button6,button7,button8);
    row3.append(button9,button10,button11,button12);
    row4.append(button13,button14,button15,button16);
    row5.append(button17,button18,button19,button20);
    row6.append(button21,button22);
    back.append(row,row1,row2,row3,row4,row5,row6);
    $(div).append(back);
}
$(document).ready(function(){
 $('.calculator').each(function(){
     //'this' refers to the <div> of class calculator
     setup_calc(this);
 });   
});

// calculates the value of the inputed text if it is an aritmatic expression
function calculate(text){
    var pattern=/\d+|\+|\-|\*|\/|\(|\)/g;
    var tokens=text.match(pattern);
    try {

        var val = evaluate(tokens);
        if (tokens.length>0){
            throw "ill-formed expression";
            }
        return String(val);
    }
    catch (err){

       return err;   // error message will be printed as the answer
    }
   
}

/*given an array of tokens, returns the next token if it is a number,
otherwise returns NaN, 
also handles open parens by retuning evaluated value of the expression w/in parens
deals with negative signs
*/
function read_operand(tokens) {
    var num = tokens[0];
    tokens.shift();
    if(num=="-"){
        num=tokens.shift()*-1;
    }
    if(num=="("){
        
       
        
        if (tokens.length>0)
        {
            num=evaluate(tokens);
            console.log(tokens);
            console.log(num);
            if (tokens[0]!=")"){
                throw "bad parens";
            }
            else{
                tokens.shift();
            }
        }
 
        }
    
 
    var result=parseInt(num); 
    if (isNaN(result)) {
        throw "not a number";
    }
    else{
        return result;
    }

}

/* evaluates expression up to a closing parenthesis
calls upon read_operand 
*/
function evaluate (tokens) {
   if (tokens.length===0){
       throw "missing operand";
   }
   
   
    var value=read_operand(tokens);
   
    while (tokens.length>0) {
        var operator = tokens[0];
        if(operator==")"){
            return value;
        }
        tokens.shift();
        if (operator !="+" && operator !="-" && operator !="*" && operator !="/" )  
        {
           throw "unrecognized operator"; 
        }
        if (tokens.length===0){
                    throw "missing operand";
                }
        var temp = read_operand(tokens);
        if(operator=="+"){
            value=value+temp;
        }
        else if(operator=="-"){
            value=value-temp;
        }
        else if(operator=="*"){
            value=value*temp;
        }
        else if(operator=="/"){
            value=value/temp;
        }
        
   }
   return value;
}
