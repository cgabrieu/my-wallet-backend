import joi from 'joi';

export const add = joi.object({
  description: joi.string().min(3).max(50).required(),
  value: joi.number().integer().required(),
});

export const remove = joi.object({
  transactionId: joi.number().integer().min(1).required(),
});
