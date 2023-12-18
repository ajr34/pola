import createEl from './utilities/createElement';

const createCarouselThumbnail = (parentEl, fxArray, imgSRC) => {
  fxArray.forEach((filterName) => {
    const imgContainer = createEl('div', 'carousel__img-frame', 'flex');
    const img = createEl('img', 'carousel__img', `filter-${filterName}`);
    img.setAttribute('src', imgSRC);
    imgContainer.appendChild(img);
    parentEl.appendChild(imgContainer);
  });
};

const loadFXThumbnails = (carousel, imgSRC) => {
  const mainIMG = document.querySelector('.card__img');
  let fxArray = [
    '1977',
    'aden',
    'amaro',
    'ashby',
    'brannan',
    'brooklyn',
    'charmes',
    'clarendon',
    'crema',
    'dogpatch',
    'earlybird',
    'ginza',
    'inkwell',
    'mayfair',
    'poprocket',
  ];
  let fxTracker = [];

  createCarouselThumbnail(carousel, fxArray, imgSRC);
  const imgFX = document.querySelectorAll('.carousel__img');

  // Add pointer events
  imgFX.forEach((element) => {
    let controller = new AbortController();
    element.setAttribute('data-clicked', 'false');

    const addHoverEffect = (target) => {
      target.addEventListener(
        'pointerenter',
        () => {
          mainIMG.classList.add(`${target.classList[1]}`);
        },
        { signal: controller.signal }
      );
      target.addEventListener(
        'pointerleave',
        () => {
          mainIMG.classList.remove(`${target.classList[1]}`);
        },
        { signal: controller.signal }
      );
    };

    addHoverEffect(element);

    element.addEventListener('pointerdown', () => {
      element.dataset.clicked = !(element.dataset.clicked === 'true');
      element.parentElement.classList.toggle('active');

      if (element.dataset.clicked === 'true') {
        // Add filter
        mainIMG.classList.add(`${element.classList[1]}`);
        // add element to tracker
        fxTracker.push(element);
        // Stop hover effect
        controller.abort();
      } else if (element.dataset.clicked === 'false') {
        // Add hover effect
        controller = new AbortController();
        addHoverEffect(element);
        // Remove filter
        mainIMG.classList.remove(`${element.classList[1]}`);
        // reset tracker
        fxTracker.splice(0, 1);
      }

      if (mainIMG.classList.length > 2) {
        mainIMG.classList.remove(`${fxTracker[0].classList[1]}`);
        fxTracker[0].parentElement.classList.remove('active');
        fxTracker[0].dataset.clicked = !(
          fxTracker[0].dataset.clicked === 'true'
        );

        /*  HOVER NOT WORKING */
        //  controller = new AbortController();
        //  addHoverEffect(fxTracker[0])
        fxTracker.splice(0, 1);
      }
    });
  });
};

export default loadFXThumbnails;
