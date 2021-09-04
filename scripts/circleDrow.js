function runCircle(radius) {
  if (document.body.querySelector('.circle')) {
    document.body.querySelector('.circle').remove()
  }

  let div = document.createElement('div');
  div.style.width = 0;
  div.style.height = 0;
  div.style.background = 'blue';
  div.className = 'circle';
  document.body.append(div);

  setTimeout(() => {
    div.style.width = radius * 2 + 'px';
    div.style.height = radius * 2 + 'px';
  }, 0);

  new Promise(function(resolve, reject) {
    setInterval(() => {
      if(+div.style.height.split('px').join('') === 0) resolve();

      div.style.background = div.style.background==='blue' ? 'green':
        div.style.background==='green' ? 'orange':
          div.style.background==='orange' ? 'red':
            div.style.background==='red' ? 'gray': 'blue';
      div.style.width = +div.style.height.split('px').join('')===radius*2 ? radius+'px' : radius*2+'px';
      div.style.height = +div.style.height.split('px').join('')===radius*2 ? radius+'px' : radius*2+'px';
    }, 2000);

    setTimeout(() => {
      div.style.width = 0 + 'px';
      div.style.height = 0 + 'px';
    }, 10000);
  })
    .then(() => { div.remove() });

  // setTimeout(() => {
  //   div.style.width = 0 + 'px';
  //   div.style.height = 0 + 'px';
  //   // div.remove();
  // }, 10000);
}
