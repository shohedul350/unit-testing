import express from 'express';
import {
  getAllUsers, saveUser, getSingleUser, update, deleteById,
} from '../services/userServices';
import validators from '../models/validation/index';
import { handleValidation } from '../middlewares/index';

const router = express.Router();
const getHandler = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return next(error, req, res);
  }
};

const postHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await saveUser(body);
    return res.status(201).send(user._id);
  } catch (error) {
    return next(error, req, res);
  }
};
const singleUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const users = await getSingleUser(id);
    return res.status(200).send(users);
  } catch (error) {
    return next(error, req, res);
  }
};
const putHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await update(body);
    return res.status(201).send(user._id);
  } catch (error) {
    return next(error, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleteById(id);
    if (result instanceof Error) {
      return next(result, req, res);
    } else {
      return res.status(200).send('User deleted');
    }
  } catch (error) {
    return next(error, req, res);
  }
};

router.get('/', getHandler);
router.get('/:id', singleUser);
router.post('/', handleValidation(validators.userSchemaValidate), postHandler);
router.put('/', putHandler);
router.delete('/:id', deleteHandler);

const configure = (app) => {
  app.use('/users', router);
};

export default configure;
