const { body } = require('express-validator');

const sellerValidationRules = [
  body('Name')
    .notEmpty().withMessage('El nombre del vendedor es obligatorio')
    .isLength({ max: 50 }).withMessage('El nombre no debe exceder los 50 caracteres'),

  body('Email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe proporcionar un correo electrónico válido')
    .isLength({ max: 50 }).withMessage('El email no debe exceder los 50 caracteres'),

  body('Phone')
    .notEmpty().withMessage('El teléfono es obligatorio')
    .isLength({ max: 50 }).withMessage('El teléfono no debe exceder los 50 caracteres'),

  body('Status')
    .notEmpty().withMessage('El estado es obligatorio')
    .isInt({ min: 0, max: 255 }).withMessage('El estado debe ser un número entero entre 0 y 255'),
];

module.exports = { sellerValidationRules };
