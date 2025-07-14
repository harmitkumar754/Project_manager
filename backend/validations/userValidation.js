const Joi = require('joi');

const userValidationSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Name must contain only letters',
      'string.empty': 'Name is required',
    }),

    Designation: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      'string.pattern.base': ' Designation must contain only letters',
      'string.empty': ' Designation is required',
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone must be a 10-digit number',
      'string.empty': 'Phone is required',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'string.empty': 'Password is required',
    }),

    jdt: Joi.string()
  .required()
  .messages({
    'string.empty': 'Joining Date is required',
  }),


});

module.exports = userValidationSchema;
