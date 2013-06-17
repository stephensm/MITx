var quiz =(function(){
    Parse.initialize("K8tnLVlOQbYYjgn9Zat2fLbrzqevAl58Ndh4SWDW", "WkT2wgwHgWAH7itZQTAjsea10Hfy7JIJJ6cAs5SI");
    
    var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
//testObject.save({"score": 0});
var score=testObject.get("score"); 
    if(isNaN(score)){
    testObject.save({"score": 0});     
    }
    //score=testObject.get("score");
   
var currentQindex=testObject.get("currentQindex");
    //console.log(isNaN(currentQindex));
    if(isNaN(currentQindex)){
    testObject.save("currentQindex",0);
}    
    //currentQindex=testObject.get("currentQindex");
    
          var exports={};
    
          var answers=[]; //list of student answers
          var questions=[{"questionText": "2+3=?","solution":5,"options": [1,3,5,7]},{"questionText": "5+1=?","solution":6,"options": [2,4,6,8]}];//question involving string array [question, answer,options]
          //solution is index of possible answers
          //questions=[{"question text": "2+3=?","solution":3,"possible answers": [1,3,5,7]}]
    
        

          //takes in question index and student answer, output: true if answer is correct
          function CheckAnswer(grade){
              
              console.log(answers[testObject.get("currentQindex")]);
              ans=questions[testObject.get("currentQindex")].solution;
            if(answers[testObject.get("currentQindex")]==ans){
                incrementScore();
                
                grade.text("Congratulations! You are correct! Your score is: "+ testObject.get("score") );
                
                
            }
              else{
                  grade.text("That is incorrect. You must now go on to the next question");
              }
              $('.quiz').append(grade);   
            }
        function getOptions(questionOb){
            var options=$('<div></div>',{class: 'options'});
            for (var i=0;i<questionOb.options.length; i++){
            var option=$('<div></div>',{class: 'options'});
            var radio=$('<input>',{type: 'radio', name:"choice" +currentQindex, value: questionOb.options[i]});
            radio.on("click", {id:questionOb.options[i]}, functionCall);  
            option.append(radio," " , questionOb.options[i]);
            options.append(option);
             
        }
         return options;      
        }
          //displays currenet quiz question to user
          function displayQ(div){
          console.log(testObject.get("currentQindex"));
          questionOb=questions[testObject.get("currentQindex")];
          var qtext=$('<div class= "questionText"></div>');
              console.log(questionOb.questionText);
          qtext.text(questionOb.questionText);
          var options=getOptions(questionOb);
          var grade=$('<div class= "grade"></div>');
              
          var next =$('<button >Next Question</button>');
          next.bind("click",function(){
                if(testObject.get("currentQindex")==questions.length-1){displayScore();}
              
                else{
                    var c=testObject.get("currentQindex");
                    testObject.save("currentQindex",c+1); 
                    console.log(testObject.get("currentQindex"));
                     $('.quiz').html("");
                     displayQ();
                    testObject.save();
                    }});
        
          var check =$('<button >Check Question</button>');
          check.one("click",function(){
              grade=$('<div class= "grade"></div>');
              CheckAnswer(grade); testObject.save();}  );    
              
              
          $('.quiz').append(qtext,options,next,check);    
          }
        
          //increment score of student when correct answer is given
          function incrementScore(){
              
              testObject.save("score", testObject.get("score")+1);
          }
          
          function setup(){
            displayQ();
          }
    
          function displayScore(){
              var scores=$('<div class= "scores"></div>').append((currentQindex,". ",          "Congratulations! You are finished! Your final score is: "+ testObject.get("score") ));
              $('.quiz').append(scores); 
          }      
    function functionCall(event)
    {
        answers[testObject.get("currentQindex")]=event.data.id;
    }
    
exports.setup=setup;
    return exports;
})();

$(document).ready(function(){
    quiz.setup();
    var req =$.ajax({
        async: false, url: "http://localhost:8080/", })
    req.done(function(msg){console.log("message: ",msg)})
});