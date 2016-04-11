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

function createElement(id, text) {
    var div = document.createElement("div");
    div.id = id;
    div.innerHTML = text;
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
            var li = createElement(e.dataTransfer.getData("id"), e.dataTransfer.getData("text"));
            this.parentNode.insertBefore(dragElement, this);
        }
        return false;
    });
    return li;
}

function drawNewLine(e) {
    var li = createElement(e.id, e.text);
    document.getElementById("elementList").appendChild(li);
}

function save() {
    json = JSON.stringify(myElements);
    $.ajax({
      url:"/save",
      type:"PUT",
      data:json,
      contentType:"application/json; charset=utf-8",
      dataType:"json"
    })
}


function load() {
    $.getJSON( "/load", function(data) {
        myElements = data;
        document.getElementById("elementList").innerHTML = "";
        myElements.forEach(drawNewLine);
    });
}