const clearChildren = (node) => {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
};

export default clearChildren;
