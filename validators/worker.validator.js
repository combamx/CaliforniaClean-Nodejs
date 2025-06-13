const { body } = require('express-validator');

const workerValidationRules = [
  body('Name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ max: 50 }).withMessage('El nombre no debe exceder los 50 caracteres'),

  body('Address')
    .optional()
    .isLength({ max: 100 }).withMessage('La dirección no debe exceder los 100 caracteres'),

  body('Phone')
    .optional()
    .isLength({ max: 50 }).withMessage('El teléfono no debe exceder los 50 caracteres'),

  body('Email')
    .optional()
    .isEmail().withMessage('El correo electrónico no es válido')
    .isLength({ max: 50 }).withMessage('El correo no debe exceder los 50 caracteres'),

  body('Status')
    .notEmpty().withMessage('El status es obligatorio')
    .isInt().withMessage('El status debe ser un número entero'),
];

module.exports = { workerValidationRules };
