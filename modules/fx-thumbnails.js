import createEl from './utilities/createElement';

const loadFXThumbnails = (carousel, imgSRC) => {
  let mainIMG = document.querySelector('.card__img');
  let fxArray = ['1977', 'aden', 'amaro', 'ashby'];

  fxArray.forEach((filterName) => {
    const imgContainer = createEl('div', 'img-frame--fx');
    const img = createEl(
      'img',
      'content--img__thumbnail',
      `filter-${filterName}`
    );
    img.setAttribute('src', imgSRC);
    imgContainer.appendChild(img);
    carousel.appendChild(imgContainer);

    imgContainer.addEventListener('mouseover', () => {
      mainIMG.classList.add(`filter-${filterName}`);
    });

    imgContainer.addEventListener('mouseleave', () => {
      mainIMG.classList.remove(`filter-${filterName}`);
    });
  });
};

export default loadFXThumbnails;
