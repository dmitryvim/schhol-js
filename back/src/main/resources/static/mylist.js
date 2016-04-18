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
    load(e);
}

function createElement(id, text) {
    var div = document.createElement("div");
    div.id = id;
    div.innerHTML = $("<div>").text(text).html();
    div.draggable = true;
    div.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData("id", this.id);
        e.dataTransfer.setData("type", "schhol-js-drag-and-drop");
        dragElement = this;
    });
    div.addEventListener('dragover', function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    });
    div.addEventListener('drop', function (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        if ((myElements.length > 1) && (e.dataTransfer.getData("type") == "schhol-js-drag-and-drop")) {
            // здесь надо переделать, но задача работает
            fromId = e.dataTransfer.getData("id");
            toId = this.id;
            from = 0;
            to = 0;
            myElements.forEach(function (value, index) {
                if (value.id == fromId) {
                    from = index;
                }
                if (value.id == toId) {
                    to = index;
                }
            });
            //
            shift(from, to);
            save();
            drawLines();
        }
        return false;
    });
    var li = document.createElement("li");
    li.appendChild(div);
    return li;
}

function shift(from, to) {
    var temp = myElements[from];
    if (from < to) {
        for (var i = from; i < to; i++) {
            myElements[i] = myElements[+i + +1];
        }
    }
    if (from > to) {
        for (var i = from; i > to; i--) {
            myElements[i] = myElements[i - 1];
        }
    }
    myElements[to] = temp;
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

function load(e) {
    $.getJSON( "/load", function(data) {
        myElements = data;
        myElements.push(e);
        drawLines();
        save();
    });
}

function drawLines() {
    document.getElementById("elementList").innerHTML = "";
    myElements.forEach(drawNewLine);
}

function sheduledLooad() {
    $.getJSON("/load", function (data) {
        myElements = data;
        drawLines();
    });
    setTimeout(sheduledLooad, 3000);
}

window.onload = function () {
    sheduledLooad();
}


