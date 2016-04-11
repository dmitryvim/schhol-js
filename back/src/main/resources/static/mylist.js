var myElements = [];
var dragElement = null;

function newElement(line) {
    var e = {id: myElements.length, text: line};
    return e;
}


function add() {
    var line = document.getElementById("newElement").value
    document.getElementById("newElement").value = "";
    var e = newElement(line);
    myElements.push(e);
    drawNewLine(e);
}

function drawNewLine(e) {
    var div = document.createElement("div");
    div.id = e.id;
    div.innerHTML = e.text;
    var li = document.createElement("li");
    li.draggable = true;
    li.appendChild(div);
    li.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData("id", e.id);
        e.dataTransfer.setData("text", e.text);
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
    $.ajax({
      url:"http://localhost:2105/save",
      type:"PUT",
      data:json,
      contentType:"application/json; charset=utf-8",
      dataType:"json"
    })
}


function load() {
    $.getJSON( "http://localhost:2105/load", function(data) {
        myElements = data;
        document.getElementById("elementList").innerHTML = "";
        myElements.forEach(drawNewLine);
    });
}