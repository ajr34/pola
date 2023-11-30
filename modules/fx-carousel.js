import createEl from './utilities/createElement';
import clearChildren from './utilities/clearChildren';
import loadFXThumbnails from './fx-thumbnails';

const loadFXCarousel = (imgSRC) => {
  const appContainer = document.getElementById('app');

  const existingCarousel = document.querySelector('.container__carousel');

  if (document.body.contains(existingCarousel)) {
    clearChildren(existingCarousel);
    loadFXThumbnails(existingCarousel, imgSRC);
  } else {
    const newCarousel = createEl('div', 'nav', 'container__carousel', 'flex');
    loadFXThumbnails(newCarousel, imgSRC);
    appContainer.appendChild(newCarousel);
  }
};

export default loadFXCarousel;
