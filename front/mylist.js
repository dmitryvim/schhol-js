var myElements = [];
var dragElement = null;

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