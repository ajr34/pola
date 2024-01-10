import './style.css';
import './filters.css';
import clearChildren from './modules/utilities/clearChildren';

import loadNav from './modules/nav';
import loadMainContainer from './modules/main-container';
import loadCard from './modules/card';
import carousel from './modules/fx-carousel';

import createEl from './modules/utilities/createElement';

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
  let userImg = e.target.files[0];
  console.log(e.target.files[0]);
  loadFile(userImg, canvas);
  renderDropArea();
});

const loadFile = (file, canvas) => {
  if (file.type.match('image.*')) {
    let reader = readFile(file);
    reader.addEventListener('load', (e) => {
      if (e.target.readyState == FileReader.DONE) {
        img.src = e.target.result;
        img.addEventListener('load', () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawImgCover(img, canvas);
        });
      }
    });
  } else {
    alert('Not an image');
    throw new Error('Error: File is not an image');
  }
};

const readFile = (file) => {
  let fr = new FileReader();
  fr.readAsDataURL(file);
  return fr;
};

const drawImgCover = (img, canvas) => {
  const context = canvas.getContext('2d');
  const ratio = img.width / img.height;
  let newWidth = canvas.width;
  let newHeight = newWidth / ratio;

  if (newHeight < canvas.height) {
    newHeight = canvas.height;
    newWidth = newHeight * ratio;
  }

  const xOffset = newWidth > canvas.width ? (canvas.width - newWidth) / 2 : 0;
  const yOffset =
    newHeight > canvas.height ? (canvas.height - newHeight) / 2 : 0;
  context.drawImage(img, xOffset, yOffset, newWidth, newHeight);
};

const renderDropArea = () => {
  imgFrame.classList.remove('img--false');
  imgFrame.classList.add('img--true');
  clearChildren(dropArea);

  dropArea.appendChild(canvas);
};

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
    let userImg = inputFile.files[0];
    loadFile(userImg, canvas);
    renderDropArea();
  }
});

