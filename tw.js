let origCon;
let order = [];
function getOrder() {
  let order = [];
  let sz = document.getElementById("swapzone");
  let kids = Array.from(sz.children);
  //console.log(kids);
  kids.forEach((div) => {
    order.push(div.firstElementChild.id);
  });
  console.log(order);
}
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  //console.log(ev.);
  origCon = ev.srcElement.parentNode;
  console.log(origCon);
}

function drop(ev) {
  ev.preventDefault();
  //move current occupant to mover location
  var data = ev.dataTransfer.getData("text");
  if (ev.target.firstElementChild) {
    origCon.appendChild(ev.target.firstElementChild);
    ev.target.appendChild(document.getElementById(data));
  } else {
    ev.srcElement.parentNode.appendChild(document.getElementById(data));
    console.log(ev);
    origCon.appendChild(ev.srcElement);
  }

  console.log(ev);
}
getOrder();
