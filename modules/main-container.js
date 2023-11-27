import createEl from './utilities/createElement';

const loadMainContainer = () => {
  const appContainer = document.getElementById('app');

  const mainContainer = createEl('main', 'container__main', 'flex');

  appContainer.appendChild(mainContainer);
};

export default loadMainContainer;
