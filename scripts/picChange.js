function picChange(event) {
  let nail = event.target.closest('a');

  if (!nail) return;

  showThumbnail(nail.href, nail.title);
  event.preventDefault();
}

function showThumbnail(href, title) {
  mainImg.src = href;
  mainImg.alt = title;
}
