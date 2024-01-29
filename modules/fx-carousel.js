import createEl from './utilities/createElement';
import clearChildren from './utilities/clearChildren';
import drawImgCover from './utilities/drawImgCover';

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

const carousel = {
  load: () => {
    const appContainer = document.getElementById('app');
    const newCarousel = createEl(
      'div',
      'nav',
      'carousel',
      'scroll-snap',
      'grid',
      'hidden'
    );
    appContainer.appendChild(newCarousel);
  },
  render: (imgBlob) => {
    const carousel = document.querySelector('.carousel');
    carousel.classList.remove('hidden');
    clearChildren(carousel);

    fxArray.forEach((filterName) => {
      const thumbContainer = createEl('div', 'carousel__img-frame', 'flex');
      const img = createEl('img', 'carousel__img', `filter-${filterName}`);
      img.setAttribute('src', imgBlob);
      thumbContainer.appendChild(img);
      carousel.appendChild(thumbContainer);
    });
  },
  eventsTo: (img) => {
    let fxTracker = [];
    let controllers = [];

    const thumbnail = document.querySelectorAll('.carousel__img');

    const canvas = document.querySelector('.canvas__img');
    const ctx = canvas.getContext('2d');

    thumbnail.forEach((element, i) => {
      element.setAttribute('data-clicked', 'false');
      controllers.push(new AbortController());

      element.addEventListener(
        'pointerenter',
        () => {
          addFilter(element);
        },
        { signal: controllers[i].signal }
      );
      element.addEventListener(
        'pointerleave',
        () => {
          if (typeof fxTracker[0] !== 'undefined') {
            addFilter(fxTracker[0]);
          } else {
            removeFilter();
          }
        },
        {
          signal: controllers[i].signal,
        }
      );

      element.addEventListener('pointerdown', (e) => {
        controllers[i].signal.addEventListener('abort', () => {
          controllers[i] = new AbortController();
        });

        e.target.dataset.clicked = !(e.target.dataset.clicked === 'true');

        if (e.target.dataset.clicked === 'true') {
          controllers[i].abort();
          e.target.parentElement.classList.add('active');
          fxTracker.push(e.target);
          addFilter(element);
        } else if (e.target.dataset.clicked === 'false') {
          e.target.addEventListener(
            'pointerenter',
            () => {
              addFilter(element);
            },
            {
              signal: controllers[i].signal,
            }
          );
          e.target.addEventListener(
            'pointerleave',
            () => {
              if (typeof fxTracker[0] !== 'undefined') {
                addFilter(fxTracker[0]);
              } else {
                removeFilter();
              }
            },
            {
              signal: controllers[i].signal,
            }
          );
          e.target.parentElement.classList.remove('active');
          fxTracker.splice(0, 1);
        }
        // CHECK IF NEXT THUMBNAIL CLICKED
        if (fxTracker.length > 1) {
          const prevElIndex = Array.prototype.indexOf.call(
            thumbnail,
            fxTracker[0]
          );

          const prevEl = fxTracker[0];

          prevEl.addEventListener(
            'pointerenter',
            () => {
              addFilter(prevEl);
            },
            {
              signal: controllers[prevElIndex].signal,
            }
          );
          prevEl.addEventListener(
            'pointerleave',
            () => {
              if (typeof fxTracker[0] !== 'undefined') {
                addFilter(fxTracker[0]);
              } else {
                removeFilter();
              }
            },
            {
              signal: controllers[prevElIndex].signal,
            }
          );

          prevEl.dataset.clicked = 'false';
          prevEl.parentElement.classList.remove('active');
          fxTracker.splice(0, 1);
        }
      });
    });

    const addFilter = (sourceEl) => {
      ctx.filter = filterCSS(sourceEl);
      drawImgCover(img, canvas);
    };
    const removeFilter = () => {
      ctx.filter = 'none';
      drawImgCover(img, canvas);
    };

    const filterCSS = (filterEl) => {
      return getComputedStyle(filterEl).getPropertyValue('filter');
    };
  },
};

export default carousel;
