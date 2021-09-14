// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("drop-area");

// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
  // document.body.addEventListener(eventName, preventDefaults, false);
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
})

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)
;
function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) {
  dropArea.classList.add('highlight');
}

function unhighlight(e) {
  dropArea.classList.remove('highlight');
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;

  contentInvisible();
  clearOldFiles();
  handleFiles(files);
}

function clearOldFiles() {
  let galleryChildren = document.body.querySelector('.drag-files-out').children;

  Array.from(galleryChildren).forEach((child) => child.remove());
}

let progressBar = document.getElementById('progress-bar');


function handleFiles(files) {
  files = [...files];
  progressBar.value = 0;
  progressBar.max = files.length;

  files.forEach(previewFile);
}

function previewFile(file) {
  let reader = new FileReader();

  if (file.type.includes('image')) {
    reader.readAsDataURL(file);

    reader.onloadend = function () {
      let img = document.createElement('img');
      img.src = reader.result;

      document.querySelector('.drag-files-out').appendChild(img);
      progressBar.value = progressBar.value + 1;
      contentCheck();
    }

    reader.onload = contentVisible;
  }
  else if (file.type.includes('text/plain')) {
    reader.readAsText(file);

    reader.onloadend = function () {
      let txt = document.createElement('textarea');
      txt.value = reader.result;
      txt.setAttribute("readonly","true");

      document.querySelector('.drag-files-out').appendChild(txt);
      progressBar.value = progressBar.value + 1;
      contentCheck();
    }

    reader.onload = contentVisible;
  }
  else {
    progressBar.value = progressBar.value + 1;
    contentCheck();
  }
}

function contentVisible() {
  document.querySelector('.drag-files-out').removeAttribute('hidden');
  document.querySelector('#hide-content-button').style.display = '';
}
function contentInvisible() {
  document.querySelector('.drag-files-out').setAttribute('hidden','');
  document.querySelector('#hide-content-button').style.display = 'none';
}

function contentOut() {
  let content = document.querySelector('.drag-files-out');

  if(!content.hidden) {
    content.hidden = true;
    document.getElementById('hide-content-button').innerHTML = 'Show Content';
  }
  else if(content.children.length > 0) {
    content.hidden = false;
    document.getElementById('hide-content-button').innerHTML = 'Hide Content';
  }
}

function contentCheck() {
  document.getElementById('progress-bar-error').hidden = !document.querySelector('.drag-files-out').children.length < 1;
}
