const createEl = (element, ...elementClass) => {
  const newEl = document.createElement(`${element}`);
  if (elementClass.length >= 1) {
    let classes = elementClass;
    newEl.classList.add(...classes);
  }
  return newEl;
};

export default createEl;
