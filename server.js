import express from 'express';
import { uploadToBucket, listUserImages } from './modules/backend/s3-api.js';

const app = express();
const port = 3000;


app.use('/', express.static('dist'));

app.use(express.json({ limit: '200kb' }));

app.post('/api', async (req, res) => {
  let img = req.body.url;
  let user = req.body.user;
  let filename = req.body.filename;

  let buf = Buffer.from(img.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  let data = {
    bucket: 'aj-pola-uploads',
    key: `${user}/${filename}.jpeg`,
    body: buf,
    tags: `user=${user}`,
  };

  let result = await uploadToBucket(data);
  res.send(result);
});

app.get('/tagged', async (req, res) => {
  let userImages = await listUserImages();
  res.send(userImages);
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
