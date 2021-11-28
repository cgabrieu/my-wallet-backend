/* eslint-disable import/prefer-default-export */
import joi from 'joi';

export const validateTransaction = joi.object({
  description: joi.string().min(3).max(50).required(),
  value: joi.number().min(3).max(50).integer()
    .required(),
});
