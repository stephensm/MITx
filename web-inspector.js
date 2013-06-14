/**
 * A simple web inspector.
 *
 * Intended to be a singleton: this only exists once per page, so it
 * attaches itself to the BODY element.
 */
var Inspector = function($) {
  exports = {};

  // The root element of the inspector.
  var root = null;
  var nodeInQuestion=null;

  var template = ""
    + "<div class='tray'>"
    + "  <textarea class='text-editor'></textarea>"
    + "  <div class='property-editor'>"
    + "      <div><button>Mouse On<button></div>"
    + "    <div class='node-lookup'>"
      + "      <input class='selector' /><input class='nth' />"
    + "      <button>Search<button>"
    + "    </div>"
    + "    <div class='property-list'>"
    + "       <table class='proptable'></table>"
    + "    </div>" 
    + "  </div>" 
    + "</div>" 
    + "<div class='handle'></div>";
var toggle=function(){
    if(root.css("top")=="0px"){
        root.animate({"top":"-300px"},2000);
    }
    else{
    root.animate({"top":"0"},2000);
    }
  }
var clearProperties=function(){
    $(root).find(".proptable").html("");
};
var addProp=function(name,value,kind){
    if(kind=="Color"){
    $('<div color='+value+'>');}
    var newRow=   $("<tr><td> "+ name+ "</td> <td>" + value + "</td> </tr>");
    $(root).find(".proptable").append(newRow);
};
var searchBySelector=function(){
    var selectorBox=root.find(".selector");
    var selectorStr=selectorBox.val();
    nodeInQuestion = $(selectorStr).first();
    var html=nodeInQuestion.html();
    var textEditor=root.find(".text-editor");
    textEditor.val(html);
    
    clearProperties();
    
    addProp("Tag",nodeInQuestion.attr('id'),"Tag");
    addProp("height",nodeInQuestion.height(),"Size");
    addProp("width",nodeInQuestion.width(),"Size");
    addProp("Top ",nodeInQuestion.css("top"),"Postion");
    addProp("Left ",nodeInQuestion.css("left"),"Postion");
    addProp("Margin ",nodeInQuestion.css("margin"),"Spacing");
    addProp("Padding ",nodeInQuestion.css("padding"),"Spacing");
    addProp("Background ",nodeInQuestion.css("background-color"),"Color");
    addProp("Foreground ",nodeInQuestion.css("color"),"Color");
    addProp("Children ",nodeInQuestion.children().length,"Children");
    addProp("Font Family ",nodeInQuestion.css("font-family"),"Font");
    addProp("Font Style ",nodeInQuestion.css("font-style"),"Font");
    addProp("Font Size ",nodeInQuestion.css("font-size"),"Font");
    
    
};
    var editHtml=function(){
        var textEditor=root.find(".text-editor");
        var html=textEditor.val();
        nodeInQuestion.html(html);
   
    };
    var highlight =function(evt){
        var ID=$(evt.target).attr("id");
        var element = $('#' + ID);
        element.css("border: 'red', 10px, solid");
    }
    var highlightOFF =function(evt){
        var ID=$(evt.target).attr("id");
        var element = $('#' + ID);
        element.css("border: 'red', 0px, solid");
    }
    var Click=function(element){
            var ID=$(evt.target).attr("id");
            var element = $('#' + ID);
            var selectorBox=root.find(".selector");
            selectorBox.val('#'+element.attr('id'));
        
    }
    var mouseON=function(){
        var selectorBox=root.find(".selector");
        selectorBox.val('#'+element.attr('id'));
        $(id).click(Click);

        onmouseover=highlight(this);
        onmouseout=highlightOFF(this);
        onclick=Click(this);
        
    }
  /*
   * Construct the UI
   */
  exports.initialize = function() {
    root = $("<div class='inspector'></div>").appendTo($('body'));
            
      root.append(template);
      root.find(".handle").on("click",toggle);
      root.find(".node-lookup button").on("click", searchBySelector);
      root.find(".text-editor").on("keyup", editHtml);
      root.find(".property-editor button").on("click", mouseON);
      
  };
  exports.toggle=toggle;
  return exports;
};

/*****************************************************************************
 * Boot up the web inspector!
 *
 * This will enable you to COPY AND PASTE this entire file into any web page
 * to inspect it.
 *
 * XXX TODO!
 *  Change the CSS link below to point to the full URL of your CSS file!
 *
 *  You shouldn't need to touch anything else below.
 *
 *****************************************************************************/
(function() {
    var createInspector = function() {
      window.inspector = Inspector(jQuery);
      window.inspector.initialize();
    }

    // Add the CSS file to the HEAD
    var css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('type', 'text/css');
    css.setAttribute('href', 'web-inspector.css'); // XXX TODO CHANGEME!!
    document.head.appendChild(css);

    if ('jQuery' in window) {
      createInspector(window.jQuery);
    } else {
      // Add jQuery to the HEAD and then start polling to see when it is there
      var scr = document.createElement('script');
      scr.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
      document.head.appendChild(scr);
      var t = setInterval(function() {
        if ('jQuery' in window) {
          clearInterval(t); // Stop polling 
          createInspector();
        }
      }, 50);
    }
})();
