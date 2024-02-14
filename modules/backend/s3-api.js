import { S3 } from '@aws-sdk/client-s3';


//Keys removed
const accessKeyId = 'REDACTED';
const secretAccessKey = 'REDACTED';
const region = 'ap-southeast-2';

const s3 = new S3({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const uploadToBucket = (req) => {
  const params = {
    Bucket: req.bucket,
    Key: req.key,
    Body: req.body,
    Tagging: req.tags,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
  };

  s3.putObject(params, function (err, data) {
    if (err) {
      console.log(err);
      console.log('Error uploading:', data);
    } else {
      console.log('image upload successful');
    }
  });
};

export const listUserImages = async () => {
  const params = {
    Bucket: 'aj-pola-uploads',
    MaxKeys: 50,
    Prefix: 'ajrea/',
  };

  try {
    const response = await s3.listObjectsV2(params);
    return response.Contents;
  } catch (err) {
    return err;
  }
};
