import './style.css';
import './filters.css';
import clearChildren from './modules/utilities/clearChildren.js';

import loadNav from './modules/nav.js';
import loadMainContainer from './modules/main-container.js';
import loadCard from './modules/card.js';
import carousel from './modules/fx-carousel.js';

import createEl from './modules/utilities/createElement.js';
import drawImgCover from './modules/utilities/drawImgCover.js';

//API TESTING
import { requestBtnsRender } from './modules/backend/client-api.js';

loadNav();
loadMainContainer();
loadCard();
carousel.load();

const dropArea = document.getElementById('drop-area');
const inputFile = document.getElementById('input-file');
const imgFrame = document.getElementById('img-frame');

// Canvas
const canvas = createEl('canvas', 'canvas__img');
const ctx = canvas.getContext('2d');

canvas.height = canvas.width;

let img = new Image();

inputFile.addEventListener('change', (e) => {
  let imgFile = e.target.files[0];
  let imgBlob = imgToBlob(e.target.files[0]);
  updateImgSRC(imgFile);
  renderImg();
  carousel.render(imgBlob);
  carousel.eventsTo(img);

  //API TESTING
  requestBtnsRender(canvas);
});

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;

  if (inputFile.files.length > 1) {
    alert(`Error: Multiple files uploaded... Can't do that yet!`);
    throw new Error(`Error: Multiple files uploaded... Can't do that yet!`);
  } else {
    let imgFile = inputFile.files[0];
    let imgBlob = imgToBlob(inputFile.files[0]);
    updateImgSRC(imgFile);
    renderImg();
    carousel.render(imgBlob);
    carousel.eventsTo(img);

    //API TESTING
    requestBtnsRender(canvas);
  }
});

const imgToBlob = (target) => URL.createObjectURL(target);

const updateImgSRC = (file) => {
  if (file.type.match('image.*')) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', (e) => {
      if (e.target.readyState == FileReader.DONE) {
        img.src = e.target.result;
      }
    });
  } else {
    alert('Not an image');
    throw new Error('Error: File is not an image');
  }
};

const renderImg = () => {
  img.addEventListener('load', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImgCover(img, canvas);
  });

  imgFrame.classList.remove('img--false');
  imgFrame.classList.add('img--true');
  clearChildren(dropArea);
  dropArea.appendChild(canvas);
};
