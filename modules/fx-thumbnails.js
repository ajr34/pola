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
    // 'ashby',
    // 'brannan',
    // 'brooklyn',
    // 'charmes',
    // 'clarendon',
    // 'crema',
    // 'dogpatch',
    // 'earlybird',
    // 'ginza',
    // 'inkwell',
    // 'mayfair',
    // 'poprocket',
  ];
  let fxTracker = [];
  let controllers = [];

  const addFX = (effect) => {
    return () => mainIMG.classList.add(`${effect}`);
  };
  const removeFX = (effect) => {
    return () => mainIMG.classList.remove(`${effect}`);
  };

  createCarouselThumbnail(carousel, fxArray, imgSRC);
  const imgFX = document.querySelectorAll('.carousel__img');

  // Add pointer events
  imgFX.forEach((element, i) => {
    let filter = element.classList[1];
    element.setAttribute('data-clicked', 'false');

    controllers.push(new AbortController());

    element.addEventListener('pointerenter', addFX(filter), {
      signal: controllers[i].signal,
    });
    element.addEventListener('pointerleave', removeFX(filter), {
      signal: controllers[i].signal,
    });

    element.addEventListener('pointerdown', (e) => {
      controllers[i].signal.addEventListener('abort', () => {
        controllers[i] = new AbortController();
      });

      e.target.dataset.clicked = !(e.target.dataset.clicked === 'true');

      if (e.target.dataset.clicked === 'true') {
        controllers[i].abort();
        e.target.parentElement.classList.add('active');
        mainIMG.classList.add(`${filter}`);
        fxTracker.push(e.target);
      } else if (e.target.dataset.clicked === 'false') {
        e.target.addEventListener('pointerenter', addFX(filter), {
          signal: controllers[i].signal,
        });
        e.target.addEventListener('pointerleave', removeFX(filter), {
          signal: controllers[i].signal,
        });
        e.target.parentElement.classList.remove('active');
        fxTracker.splice(0, 1);
      }

      if (fxTracker.length > 1) {
        const prevElIndex = Array.prototype.indexOf.call(imgFX, fxTracker[0]);
        const prevEl = fxTracker[0];

        prevEl.addEventListener('pointerenter', addFX(prevEl.classList[1]), {
          signal: controllers[prevElIndex].signal,
        });
        prevEl.addEventListener('pointerleave', removeFX(prevEl.classList[1]), {
          signal: controllers[prevElIndex].signal,
        });
        mainIMG.classList.remove(prevEl.classList[1]);
        prevEl.dataset.clicked = 'false';
        prevEl.parentElement.classList.remove('active');
        fxTracker.splice(0, 1);
      }
    });
  });
};

export default loadFXThumbnails;
