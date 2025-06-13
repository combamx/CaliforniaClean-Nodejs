const { body } = require('express-validator');

const buildingValidationRules = [
  body('Description')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ max: 200 }).withMessage('La descripción no debe exceder los 200 caracteres'),

  body('IDTypeProject')
    .notEmpty().withMessage('El ID del tipo de proyecto es obligatorio')
    .isInt({ gt: 0 }).withMessage('El ID del tipo de proyecto debe ser un número entero positivo'),

  body('Order')
    .notEmpty().withMessage('El campo orden es obligatorio')
    .isInt({ min: 0 }).withMessage('El orden debe ser un número entero igual o mayor que cero')
];

module.exports = { buildingValidationRules };
