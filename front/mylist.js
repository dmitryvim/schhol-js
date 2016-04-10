myElements = [];

function newElement(line) {
    var e = {};
    e.id = myElements.length;
    e.text = line;
    return e;
}


function add() {
    var line = document.getElementById("newElement").value
    var e = newElement(line);
    myElements.push(e);
    drawNewLine(e);
}

function drawNewLine(e) {
    var li = document.createElement("li");
    li.id = "item_" + e.id;
    li.innerHTML = e.text;
    document.getElementById("elementList").appendChild(li);
}
