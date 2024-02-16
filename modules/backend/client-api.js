import createEl from '../utilities/createElement.js';

//TEST USER VAR
let user = 'ajrea';

const postHandler = (canvasEl) => {
  const data = canvasEl.toDataURL('image/jpeg', 1);
  const timestamp = Math.round(Date.now() / 1000);

  const imgObj = {
    url: data,
    user: user,
    filename: timestamp,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(imgObj),
  };

  fetch('/api', options);
};

const getHandler = () => {
  fetch('/tagged');
};

export const requestBtnsRender = (canvasEl) => {
  const card = document.querySelector('.card');
  const postBtn = createEl('button', 'btn', 'btn--post');
  postBtn.innerText = 'Post Image';
  const getBtn = createEl('button', 'btn', 'btn--get');
  getBtn.innerText = 'Get Image';

  card.appendChild(postBtn);
  card.appendChild(getBtn);

  postBtn.addEventListener('pointerdown', () => postHandler(canvasEl));
  getBtn.addEventListener('pointerdown', () => getHandler());
};
