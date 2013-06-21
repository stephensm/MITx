var knapsack=(function(){
    var All=[]
    function EventHandler(){
        
        var handlers={};
        //map event string to list of callbacks
        function on(eventString, callback){
            var cblist=handlers[eventString]
            if(cblist===undefined){
                cblist=[]
                handlers[eventString]=cblist;
            }
            cblist.push(callback);
            
        }
        function trigger(eventString,data){
            var cblist=handlers[eventString];
            if(cblist!== undefined){
                for (var i=0;i<cblist.length;i+=1)
                {
                    cblist[i](data);
                }
            }
        }
            return{on:on, trigger: trigger}
    }
    //addOne()
    function Model(div){
        var house=["clock","painting","radio","vase","book","computer"];
        var knapsack=[];
        var cost=0;
        var weight=0;
        var eventHandler=EventHandler();
        var count=0;
        function move(obj){
           
          var item=$(obj.childNodes[0]);
        var name=item.attr("data-name");
             
            var f=house.indexOf(name);
            
            if(f >= 0) {
                
                if(weight+parseInt(item.attr("data-weight"))>20){
                    eventHandler.trigger('alert',"too Heavy");}
                else{
                   
                   house.splice(f, 1);
                   knapsack.push(name);
                    weight+=parseInt(item.attr("data-weight"));
                    cost+=parseInt(item.attr("data-value"));
                    eventHandler.trigger('update',{"house":house, "knapsack":knapsack});
                } 
            }  
            
            else{
                f = knapsack.indexOf(name);
                knapsack.splice(f, 1);
                house.push(name);
                weight-=parseInt(item.attr("data-weight"));
                cost-=parseInt(item.attr("data-value"));
                eventHandler.trigger('update',{"house":house, "knapsack":knapsack});

            }
            
            
        }
        
        function getCost(){
            return cost;
        }
         function getWeight(){
            return weight;
        }
        return {move: move, getCost:getCost,  getWeight: getWeight, on:eventHandler.on};
    }
   
    function Controller(model){
        function move(item)
        {
           
            model.move(item.currentTarget);
        }
         return {move: move};
    }
     function View (div, model, controller){
      
          function update(dict)
         {  
            var hlist=dict["house"];
            var slist=dict["knapsack"];
            var cost=model.getCost();
            var weight=model.getWeight();
            
            
            
            var hdivs=$("<div class= 'hbox'></div>");
            var sdivs=$("<div class='sbox'></div>");
            
            //need to update these
             var wlab=$("<div class='wvlab'>Weight: " +weight+ "/20 lbs </div>");
            var vlab=$("<span class='vlab'>Value:  $" + cost+"</span>");
            wlab.append(vlab);
             
                for (var j=0;j<All.length;j+=1){
                   var item=All[j][0].childNodes[0];
               
                   if(hlist.indexOf($(item).attr("data-name"))>=0){
                       
                        hdivs.append($(All[j][0]));
                     
                    
                   }
                   else{
                       sdivs.append($(All[j][0]));
                   }   
                   }
                   $('div.hbox').remove();
                   $('div.sbox').remove();

                   $('div.house').append(hdivs);
                   $('div.sack').append(sdivs);
                    
             
            $(document.getElementById('slabel')).html(wlab.html());
 
            
         }
         function alert(){
            
            playSound('https://www.acc.umu.se/~snow/ljud/trombon.wav'); 
            var warning=$("<div class='warning'></div>"); //added all this stuff
        	var warningPic = $('<img src="warn.jpg"></img>');
			warning.append(warningPic);
			console.log($(".knapsack") + warning);
            $(".knapsack").append(warning)
			 warning.delay(3600).fadeOut(600);
           
         };
         
         function toggle() {
        	knapsack = $(".knapsack");
			console.log(knapsack.css("top"));
			if (knapsack.css("top") == "50px"){
				knapsack.animate({"top": "-427px", "left":"-760px"}, 800);
				$(".toggleButt").text("Expand");
			} else{
				knapsack.animate({"top": "50px", "left":"0px"},800);
				$(".toggleButt").text("Hide");
			};
			
		};
        
         
         model.on('update',update);
         model.on('alert',alert);
         return {alert:alert, toggle:toggle};
    }
    
    function playSound(soundfile) {
 document.getElementById("dummy").innerHTML=
 "<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
 
 }
 function check(){
        var correct=$("<div class='warning'></div>"); //added all this stuff
    console.log($(".vlab").text());
     if ($(".vlab").text() == 'Value:  $275'){
        var correctPic = $('<img src="https://upload.wikimedia.org/wikipedia/en/6/6f/Smiley_Face.png"></img>');
     }else{
		var correctPic = $('<img src="incorrect.png"></img>'); 
	 }
	 	correct.append(correctPic);
		console.log($(".knapsack") + correct);
        $(".knapsack").append(correct)
		correct.delay(1000).fadeOut(600);
 }
 
    function setup(div){
      
        var model=Model();
        var controller=Controller(model);
        var view=View(div, model,controller);
        var items=[$('<img src="ring.png" data-value="175" data-weight="10" data-name="clock"height=60px>'),
        $('<img src="painting.jpg" data-value="90" data-weight="9" data-name="painting" height=60px>'),
        $('<img src="diamond.png" data-value="20" data-weight="4" data-name="radio" height=60px>'),
        $('<img src="urn.png" data-value="50" data-weight="2" data-name="vase"height=60px>'),
        $('<img src="https://www.medievalcollectibles.com/images/Product/icon/OB-115.png" data-value="10" data-weight="1" data-name="book" height=60px>'),
        $('<img src="mac.png" data-value="200" data-weight="20" data-name="computer"height=60px>"')];
        
        var head=$(" <h2 style='text-align: center; margin:10px;'>The Burgler's Dilemma</h2>")
        
      var thing=null;
      var object=null;
      var imdiv=null;
      
      for (var i=0;i<items.length;i+=1){
          thing=items[i];
          imdiv=$("<div class = imageDiv  >"+thing.attr("data-weight")+ "lbs  $"
          +thing.attr("data-value") +"</div>");
       
          object=$("<div class = objectDiv  ></div>");
          object.append(thing,imdiv);
          object.on("click",controller.move);
          All.push(object);
          
      }
      
        var house=$("<div class='house'  width=300px></div>");
        var imgh=$("<img src='castle.png' class='imgh' height=60px>");
        
        var boxh=$("<div class='hbox' id= 'houseBox'></div>");
        for (var j=0;j<All.length;j+=1){
          boxh.append(All[j]);
      }
        var labelh=$("<div>Click to put items in knapsack</div>");
        house.append(imgh,labelh,boxh);
    
        var sack=$("<div class='sack' ></div>");
        var imgs=$("<img src='JackSparrow.png' class='imgs' height=60px>");
        var wlab=$("<div class='wvlab' id= 'slabel'>Weight: 0/20 lbs   </div>");
        var vlab=$("<span class='vlab'>Value: <span class='v'>0</span></span>");
wlab.append(vlab);
        var boxs=$("<div class='sbox' id= 'sackBox'></div>");
        var labels=$("<div>Click to remove items from knapsack</div>");
        sack.append(imgs, wlab,labels,boxs);
		
        var toggleBut =$("<div class = 'toggleButt'>HIDE!</div>");
		toggleBut.on("click", view.toggle);
        var Checkdiv=$("<div></div");
        var Check=$("<button class='check'>Check Answer</button>");
        Checkdiv.append(Check);
        Check.on("click",check);
        
        $(div).append(head, Checkdiv,house,sack, toggleBut); //added alert
    }
    
    return {setup: setup};
}());
$(document).ready(function(){
    $('.knapsack').each(function(){
        knapsack.setup($(this));});
});