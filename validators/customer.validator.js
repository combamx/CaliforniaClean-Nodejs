const { body } = require('express-validator');

const customerValidationRules = [
  body('CompanyName').notEmpty().withMessage('CompanyName es requerido'),
  body('Address').notEmpty().withMessage('Address es requerido'),
  body('City').notEmpty().withMessage('City es requerido'),
  body('Zip').notEmpty().withMessage('Zip es requerido'),
  body('Email').isEmail().optional({ nullable: true }).withMessage('Email inválido'),
  body('Phone').isString().optional(),
  body('Status').isBoolean().withMessage('Status debe ser booleano')
];

module.exports = { customerValidationRules };
