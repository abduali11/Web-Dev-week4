import {addCat, findCatById, listAllCats} from '../models/cat-model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  console.log('req', req);
  console.log('postCat', req.body);
  console.log('postFile', req.file);

  const result = addCat(req.body, req.file);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  console.log({message: 'Cat item updated.'});
  res.sendStatus(200);
};

const deleteCat = (req, res) => {
  console.log({message: 'Cat item deleted.'});
  res.sendStatus(200);
};

export {getCat, getCatById, postCat, putCat, deleteCat};
