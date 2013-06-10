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
    catch (err)
    {

       return err;   // error message will be printed as the answer

    }
    return JSON.stringify(tokens);
}
function read_operand(tokens) {
    var num = tokens[0];
    tokens.shift();
    var result=parseInt(num); 
    if (isNaN(result))
    {
        throw "not a number";
    }
    else
    {
        return result;
    }

}


function evaluate (tokens) {
   if (tokens.length===0){
       throw "missing operand";
   }
   
   else{
       var value=read_operand(tokens);
   } 
   while (tokens.length>0) {
        var operator = tokens[0];
        tokens.shift();
        if (operator !="+" && operator !="-" && operator !="*" && operator !="/")  
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
          // perform requested operation
   }
   return value;
}
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