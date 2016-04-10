var myElements = [];
var dragElement = null;

function newElement(line) {
    var e = {id: myElements.length, text: line};
    return e;
}


function add() {
    var line = document.getElementById("newElement").value
    var e = newElement(line);
    myElements.push(e);
    drawNewLine(e);
}

function drawNewLine(e) {
    var div = document.createElement("div");
    div.id = "item_" + e.id;
    div.innerHTML = e.text;
    div.draggable = true;
    var li = document.createElement("li");
    li.appendChild(div);
    li.addEventListener('dragstart', function(event) {
          dragElement = this;
        });
    li.addEventListener('dragover', function(e) {
                        		if (e.preventDefault) {
                        			e.preventDefault();
                        		}
                        		e.dataTransfer.dropEffect = 'move';
                        		return false;
                        	});
    li.addEventListener('drop', function(e) {
                       		if (e.preventDefault) e.preventDefault();
                         	if (e.stopPropagation) e.stopPropagation();
                         	if (myElements.length > 1) {
                                var list = document.getElementById("elementList")
                                list.removeChild(dragElement);
                       		    this.parentNode.insertBefore(dragElement, this);
                       		}
                       		return false;
                       	});
    document.getElementById("elementList").appendChild(li);
}

function save() {
    json = JSON.stringify(myElements);
    alert(json);
    $.ajax({
        type: "PUT",
        url: "http://localhost:2105/save",
        dataType: "jsonp",
        data: {"data": "mydata"},
        crossDomain: true,
    });
}

function loadElements() {
    var my_JSON_object;
    var http_request = new XMLHttpRequest();
    http_request.open("GET", "http://localhost:2105/load", true);
    http_request.setRequestHeader('Access-Control-Allow-Origin', '*');
    http_request.onreadystatechange = function () {
        var done = 4, ok = 200;
        if (http_request.readyState === done && http_request.status === ok) {
            myElements = JSON.parse(http_request.responseText);
        }
    };
    http_request.send();

//    $.ajax({
//      url: "http://localhost:2105/load",
//      dataType: "jsonp",
//      type: "GET",
//      success: function (data) {console.log(data);},
//      error: function(d1, d2, d3)  {console.log(d1);console.log(d2);console.log(d3);},
//    });

//    $.getJSON( "http://localhost:2105/load", function( data ) {
//      myElements = $.parseJSON(data);
//    });
    return myElements;
}

function load() {
    myElements = loadElements();
    document.getElementById("elementList").innerHTML = "";
    myElements.forEach(drawNewLine);
}