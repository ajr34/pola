import createEl from './utilities/createElement';
import clearChildren from './utilities/clearChildren';
import loadFXThumbnails from './fx-thumbnails';

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
  refresh: (imgSRC) => {
    const carousel = document.querySelector('.carousel');
    carousel.classList.remove('hidden');
    clearChildren(carousel);
    loadFXThumbnails(carousel, imgSRC);
  },
};

export default carousel;
