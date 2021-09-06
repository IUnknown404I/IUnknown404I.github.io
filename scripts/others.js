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

