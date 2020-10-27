import userModel from '../../models/index';

const users = [
  {
  '_id': '1', 'userName': 'test001',
},
{
  '_id': '2', 'userName': 'test002',
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

export const getSingleUser = async (id) => {
  const model = users.find((user) => user._id === id);
  return model;
};

export const update = async (updateDate) => {
  const model = users.find((u) => u._id === updateDate._id);
  if (model) {
    model.userName = updateDate.userName;
    return model;
  }
  // users[0].userName = user.userName;
  // return users[0];
};
