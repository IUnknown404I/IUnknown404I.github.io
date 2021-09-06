"use strict";

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`)
    .then(response => response.json());
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let separate = document.createElement('hr');
    // separate.style.marginTop = 22 + 'px';
    out.append(separate);

    let img = document.createElement('img');
    img.border = 2;
    img.vspace = 10;
    img.align = "center";
    img.src = githubUser.avatar_url;
    img.className = "gitAvatar";

    out.append(img);

    setTimeout(() => {
      img.remove();
      separate.remove();
      resolve(githubUser);
    }, 5500);
  });
}

function runAvatar() {
  if(document.body.querySelector('.gitAvatar')) return;

  loadGithubUser("IUnknown404I")
    .then(showAvatar)
// .then(githubUser => alert(`Показ аватара ${githubUser.name} завершён`));
}
