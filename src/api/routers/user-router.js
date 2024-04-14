import express from 'express';
import {
  getAllUsers,
  getUserById,
  addUser,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

import Multer from 'multer';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
  })
  .post(async (req, res) => {
    const newUser = await addUser(req.body);
    res.json(newUser);
  });

userRouter
  .route('/:id')
  .get(async (req, res) => {
    const user = await getUserById(req.params.id);
    res.json(user);
  })
  .put(async (req, res) => {
    const updatedUser = await modifyUser(req.body, req.params.id);
    res.json(updatedUser);
  })
  .delete(async (req, res) => {
    const deletedUser = await removeUser(req.params.id);
    res.json(deletedUser);
  });

export default userRouter;
