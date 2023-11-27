import createEl from './utilities/createElement';

const loadNav = () => {
  const appContainer = document.getElementById('app');

  const nav = createEl('nav', 'nav', 'flex');
  const logo = createEl('h1', 'logo');
  logo.innerText = 'POLA';

  const navLinksContainer = createEl('ul', 'flex');

  let links = ['home', 'logout'];

  for (let i = 0; i < links.length; i++) {
    const navLI = createEl('li');
    navLinksContainer.appendChild(navLI);

    const navLink = createEl('a', 'link');
    navLink.innerText = links[i];
    navLI.appendChild(navLink);
  }

  appContainer.appendChild(nav);
  nav.appendChild(logo);
  nav.appendChild(navLinksContainer);
};

export default loadNav;
