function picInfoVisible(event) {
  let pic = document.body.querySelector('.pics');
  pic.hidden = !pic.hidden;
  event.target.innerHTML = event.target.innerHTML === 'Collapse Pic Table' ? 'Expand Pic Table':'Collapse Pic Table';
}

function closeOropenNav() {
  document.getElementById("side").hidden = !document.getElementById("side").hidden;
  document.getElementById("sideOpen").hidden = !document.getElementById("sideOpen").hidden;

  document.getElementById("sideOpen").style.left = document.documentElement.clientWidth - 38 + 'px';
}

function mouseLog(event) {
  let d = new Date();

  dragText.value += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}>>${event.type} |target: ${event.target.id}\n`;

  dragText.scrollTop = dragText.scrollHeight;
}

function onRadioChange(event) {
  if(event.target.checked) {
    let parent = document.body.querySelector('#parent');

    switch (event.target.name){
      case 'enterleave':
        parent.onmouseover = parent.onmouseout = null;
        parent.onmouseenter = parent.onmouseleave = mouseLog;
        break;
      case 'overout':
        parent.onmouseover = parent.onmouseout = mouseLog;
        parent.onmouseenter = parent.onmouseleave = null;
        break;
    }
    options.querySelectorAll(':checked').forEach(radio => {if(radio!==event.target) radio.checked = !radio.checked;})
  } else {
    if(options.querySelectorAll(':checked')) event.target.checked = !event.target.checked;
  }
}

function onDragAndDropButClick(event) {
  let result = true;
  let trueItems = document.body.querySelectorAll('.dragAndDrop_chooses > .item');

  if(trueItems.length == 3)
    trueItems.forEach(element => {
      if(element.innerHTML !== 'V8 Engine' && element.innerHTML !== 'Rhino Engine' &&
          element.innerHTML !== 'OOP methodology') result = false;
      console.log(element.innerHTML);
      console.log(result);
    });
  else result = false;

  let divResult = document.createElement('div');

  divResult.id = "resultDrag";
  divResult.style.font = "bold 16px sans-serif";
  divResult.style.color = "darkorange";
  divResult.innerHTML = result ? "Congratulations! You are right!" : "Try again. So far, this is not true.";

  if(event.target.parentNode.querySelector('#resultDrag'))
    event.target.parentNode.querySelector('#resultDrag').remove();

  event.target.parentNode.append(divResult);

  setTimeout(() => {
    divResult.remove();
  }, 10000);
}