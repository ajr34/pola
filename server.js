import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { uploadToBucket, listUserImages } from './modules/backend/s3-api.js';

const port = 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname + '/')));

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

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
  console.log(userImages);
  res.send(test);
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
