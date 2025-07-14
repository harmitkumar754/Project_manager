const Joi = require('joi');

const loginValidationSchema = Joi.object({
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone must be a valid 10-digit number',
      'string.empty': 'Phone number is required',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'string.empty': 'Password is required',
    }),
});

module.exports = loginValidationSchema;
