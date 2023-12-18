import './style.css';
import './filters.css';
import clearChildren from './modules/utilities/clearChildren';

import loadNav from './modules/nav';
import loadMainContainer from './modules/main-container';
import loadCard from './modules/card';
import carousel from './modules/fx-carousel';

loadNav();
loadMainContainer();
loadCard();
carousel.load();

const dropArea = document.getElementById('drop-area');
const inputFile = document.getElementById('input-file');
const imgFrame = document.getElementById('img-frame');
const imgMainBtn = document.querySelector('.btn');

const uploadImage = () => {
  imgFrame.classList.remove('img--false');
  imgFrame.classList.add('img--true');
  clearChildren(dropArea);

  let imgSRC = URL.createObjectURL(inputFile.files[0]);
  let newImg = document.createElement('img');

  newImg.src = imgSRC;
  newImg.classList.add('card__img');
  dropArea.appendChild(newImg);

  carousel.refresh(imgSRC);
};

inputFile.addEventListener('change', () => {
  fileTypeCheck(inputFile.files);
  uploadImage();
  updateCardBtn();
});

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;

  let uploadedFile = e.dataTransfer.items;

  multiFileCheck(uploadedFile);
  fileTypeCheck(uploadedFile);

  uploadImage();
  updateCardBtn();
});

const fileTypeCheck = (dataTransferObj) => {
  const typeList = ['png', 'jpeg', 'webp'];

  let matchingFileType = typeList.filter((type) => {
    return dataTransferObj[0].type == `image/${type}`;
  });

  if (dataTransferObj[0].type !== `image/${matchingFileType}`) {
    alert('Not an image');
    throw new Error('Error: File is not an image');
  }
};

const multiFileCheck = (dataTransferObj) => {
  if (dataTransferObj.length > 1) {
    alert(`Error: Multiple files uploaded... Can't do that yet!`);
    throw new Error(`Error: Multiple files uploaded... Can't do that yet!`);
  }
};

const updateCardBtn = () => {
  imgMainBtn.innerText = 'save';
};
