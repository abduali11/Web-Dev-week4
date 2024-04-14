import express from 'express';
import {
  getuser,
  getuserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getuser).post(postUser);

userRouter.route('/:id').get(getuserById).put(putUser).delete(deleteUser);

export default userRouter;
