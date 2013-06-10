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

//sets up visual display for calculator
function setup_calc(div){
    var input=$('<input></input>',{type: "text", size: 50});
    var output=$('<div></div>');
    var button=$('<button>Calculate</button>');
    button.bind("click",function(){
        output.text(String(calculate(input.val())));
        
    });
    $(div).append(input,button,output);
}
$(document).ready(function(){
 $('.calculator').each(function(){
     //'this' refers to the <div> of class calculator
     setup_calc(this);
 });   
});