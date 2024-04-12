import {listAllusers, finduserById, addUser} from '../models/user-model.js';

const getuser = async (req, res) => {
  res.json(listAllusers());
};

const getuserById = async (req, res) => {
  const user = finduserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
  console.log({message: 'User item updated.'});
  res.sendStatus(200);
};

const deleteUser = (req, res) => {
  console.log({message: 'User item deleted.'});
  res.sendStatus(200);
};

export {getuser, getuserById, postUser, putUser, deleteUser};
