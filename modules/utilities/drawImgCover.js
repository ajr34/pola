const drawImgCover = (img, canvas) => {
  const context = canvas.getContext('2d');
  const ratio = img.width / img.height;
  let newWidth = canvas.width;
  let newHeight = newWidth / ratio;

  if (newHeight < canvas.height) {
    newHeight = canvas.height;
    newWidth = newHeight * ratio;
  }

  const xOffset = newWidth > canvas.width ? (canvas.width - newWidth) / 2 : 0;
  const yOffset =
    newHeight > canvas.height ? (canvas.height - newHeight) / 2 : 0;
  context.drawImage(img, xOffset, yOffset, newWidth, newHeight);
};

export default drawImgCover;