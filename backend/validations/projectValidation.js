const Joi = require('joi');

const projectValidationSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.empty': 'Title is required',
  }),
  description: Joi.string().trim().required().messages({
    'string.empty': 'Description is required',
  }),
  deadline: Joi.required().messages({
    
    'any.required': 'Deadline is required',
  }),
  status: Joi.string().valid('Not Started', 'In Progress', 'Completed').required().messages({
    'any.only': 'Status must be one of Not Started, In Progress, or Completed',
    'string.empty': 'Status is required',
  }),
});

module.exports = projectValidationSchema;
