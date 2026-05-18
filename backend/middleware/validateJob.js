import { body, param } from 'express-validator';
import mongoose from 'mongoose';

export const validateCreateJob = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').optional().isString().withMessage('Category must be a string'),
  body('location').optional().isString().withMessage('Location must be a string'),
  body('contactName').optional().isString().withMessage('Contact name must be a string'),
  body('contactEmail').optional().isEmail().withMessage('Contact email must be valid')
];

export const validateStatusUpdate = [
  param('id').custom((value) => mongoose.isValidObjectId(value)).withMessage('Invalid job id'),
  body('status').isIn(['Open', 'In Progress', 'Closed']).withMessage('Status must be Open, In Progress, or Closed')
];

export const validateIdParam = [
  param('id').custom((value) => mongoose.isValidObjectId(value)).withMessage('Invalid job id')
];