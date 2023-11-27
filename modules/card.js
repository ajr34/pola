import createEl from './utilities/createElement';
import fileIcon from '../assets/icons/file_new.svg';

const loadCard = () => {
  const mainContainer = document.querySelector('.container__main');

  const cardContainer = createEl('div', 'container__card');
  cardContainer.setAttribute('id', 'container-card');

  const card = createEl('div', 'card', 'flex');

  const imgFrame = createEl('div', 'card__img-frame', 'img--false');
  imgFrame.setAttribute('id', 'img-frame');

  const dropArea = createEl('div', 'flex');
  dropArea.setAttribute('id', 'drop-area');

  const dropAreaIcon = createEl('img', 'drop-area__icon');
  dropAreaIcon.setAttribute('src', fileIcon);

  const dropAreaText = createEl('h2', 'drop-area__text');
  dropAreaText.innerText = 'Drag images here or click button below';

  const fileInputLabel = createEl('label', 'btn');
  fileInputLabel.setAttribute('for', 'input-file');

  const fileInputLabelText = createEl('p');
  fileInputLabelText.innerText = 'Browse Files';

  const fileInput = createEl('input');
  Object.assign(fileInput, {
    type: 'file',
    accept: 'image/*',
    id: 'input-file',
    hidden: ' ',
  });

  mainContainer.appendChild(cardContainer);
  cardContainer.appendChild(card);

  card.appendChild(imgFrame);
  imgFrame.appendChild(dropArea);
  dropArea.appendChild(dropAreaIcon);
  dropArea.appendChild(dropAreaText);

  card.appendChild(fileInputLabel);
  fileInputLabel.appendChild(fileInputLabelText);
  card.appendChild(fileInput);
};

export default loadCard;
