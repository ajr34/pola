import createEl from './utilities/createElement';

const loadFXThumbnails = (carousel, imgSRC) => {
  let mainIMG = document.querySelector('.card__img');
  let fxArray = ['1977', 'aden', 'amaro', 'ashby'];

  const addFilter = (filterName) => {
    mainIMG.classList.add(`filter-${filterName}`);
  };
  const removeFilter = (filterName) => {
    mainIMG.classList.remove(`filter-${filterName}`);
  };

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

    let hoverController = new AbortController();

    imgContainer.addEventListener('mouseenter', () => addFilter(filterName));

    imgContainer.addEventListener(
      'mouseleave',
      () => removeFilter(filterName),
      { signal: hoverController.signal }
    );

    let isClicked = false;

    const toggleFilter = () => {
      isClicked = !isClicked;
      if (isClicked) {
        hoverController.abort();
      } else {
        hoverController = new AbortController();
        imgContainer.addEventListener(
          'mouseleave',
          () => removeFilter(filterName),
          { signal: hoverController.signal }
        );
      }
    };

    imgContainer.addEventListener('click', () => {
      toggleFilter();
    });
  });
};

export default loadFXThumbnails;
