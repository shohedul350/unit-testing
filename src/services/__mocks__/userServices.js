import userModel from '../../models/index';

const users = [{
  '_id': '1', 'username': 'test001',
},
{
  '_id': '2', 'username': 'test002',
},
];
  //  eslint-disable-next-line
export const getAllUsers = async () => {
  return users;
};

export const saveUser = async (user) => {
  const model = new userModel.User(user);
  users.push(model);
  return model;
};
