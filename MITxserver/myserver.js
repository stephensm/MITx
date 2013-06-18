var sys = require("sys"),  
my_http = require("http");  
          var url=require("url");    
          var solutions=["5","6"];
          var score=0;
          function CheckAnswer(qnumber,ans){
              
              console.log(solutions[qnumber]);
              score++;
            if(solutions[qnumber]==ans){
                
                var text="Congratulations! You are correct! Your score is: "+ score;
                
                
            }
              else{
                  var text="That is incorrect. You must now go on to the next question";
              }
              return text;  
            }

my_http.createServer(function(request,response){  
    sys.puts("I got kicked");  
    response.writeHeader(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": '*'});  

    var info=url.parse(request.url,true);
    sys.puts(info.query.ans);
    var qnumber=info.query.pnum;
    var ans=info.query.ans;
    var t=CheckAnswer(parseInt(qnumber),ans);
    response.write(t);  
    response.end();  
}).listen(8080);  
sys.puts("Server Running on 8080");   