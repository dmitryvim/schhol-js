myElements = [];

function add() {
    var line = document.getElementById("newElement").value
    myElements.push(line);
    drawNewLine(line);
}

function drawNewLine(line) {
    var li = document.createElement("li");
    li.innerHTML = line;
    document.getElementById("elementList").appendChild(li);
}
