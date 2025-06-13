const { body } = require('express-validator');

const statusDateValidationRules = [
  body('Description')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ max: 50 }).withMessage('La descripción no debe exceder los 50 caracteres'),

  body('TextColor')
    .notEmpty().withMessage('El color del texto es obligatorio')
    .isLength({ max: 50 }).withMessage('El color del texto no debe exceder los 50 caracteres'),

  body('BackColor')
    .notEmpty().withMessage('El color de fondo es obligatorio')
    .isLength({ max: 50 }).withMessage('El color de fondo no debe exceder los 50 caracteres'),
];

module.exports = { statusDateValidationRules };
