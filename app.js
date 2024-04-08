import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/api/v1/cat', (req, res) => {
  const cat = {
    name: 'Fluffy',
    age: 3,
    breed: 'Persian',
    Image: 'https://loremflickr.com/320/240/cat',
  };
  res.json(cat);
});
