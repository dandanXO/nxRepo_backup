const fetch = require('node-fetch');
const fs = require('fs');
const downloadFile = async (url, path) => {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(path);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on('error', reject);
    fileStream.on('finish', resolve);
  });
};

downloadFile(
  'http://3.111.118.247:8080/v2/api-docs',
  './task/openapi-typescript-codegen/openapi.json'
);
