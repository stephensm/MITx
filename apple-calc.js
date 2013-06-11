function setup_calc(div){
    var back=$('<div id="back">');
    var input=$('<input></input>',{type: "text", size: 50});
    var button1=$('<button class="calcbutton">MC</button>');
    var button2=$('<button class="calcbutton">M+</button>');
    var button3=$('<button class="calcbutton">M-</button>');
    var button4=$('<button class="calcbutton">MR</button>');
    var row1=$('<div id=row1>');
    var button5=$('<button class="calcbutton">C</button>');
    var button6=$('<button class="calcbutton">±</button>');
    var button7=$('<button class="calcbutton">&divide</button>');
    var button8=$('<button class="calcbutton">&times</button></div>');
    var row2=$('<div id="row2">');
    var button9=$('<button class="calcbutton">7</button>');
    var button10=$('<button class="calcbutton">8</button>');
    var button11=$('<button class="calcbutton">9</button>');
    var button12=$('<button class="calcbutton">-</button></div>');
    var row3=$('<div id="row3">');
    var button13=$('<button class="calcbutton">4</button>');
    var button14=$('<button class="calcbutton">5</button>');
    var button15=$('<button class="calcbutton">6</button>');
    var button16=$('<button class="calcbutton">+</button></div>');
    var row4=$('<div id="row4">');
    var button17=$('<button class="calcbutton">1</button>');
    var button18=$('<button class="calcbutton">2</button>');
    var button19=$('<button class="calcbutton">3</button></div>');
    var row5=$('<div id="row5">');
    var button21=$('<button class="zerobut">0</button>');
    var button22=$('<button class="calcbutton">.</button></div>');
    var button20=$('<button class="eqbut">=</button>');
    var row6=$('<div id="row6">');

    
    row1.append(button1,button2,button3,button4);
    row2.append(button5,button6,button7,button8);
    row3.append(button9,button10,button11,button12);
    row4.append(button13,button14,button15,button16);
    row5.append(button17,button18,button19,button20);
    row6.append(button21,button22)
    back.append(input, row1,row2,row3,row4,row5,row6);
    $(div).append(back);
}
$(document).ready(function(){
 $('.calculator').each(function(){
     //'this' refers to the <div> of class calculator
     setup_calc(this);
 });   
});