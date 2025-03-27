import express from 'express';

const setupServer = express();

setupServer.listen(3000, () => {
  console.log('server working in port 3000');
});
