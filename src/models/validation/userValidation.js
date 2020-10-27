import Joi from 'joi';

const schema = Joi.object().keys(
  {
    id: Joi.string(),
    userName: Joi.string().alphanum().min(3).required(),
    email: Joi.string().email().required(),
    address: Joi.string().max(30).required(),

  },
);

const validate = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

export default validate;
