const { body } = require('express-validator');

const commentsWOValidationRules = [
  body('Description')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ max: 100 }).withMessage('La descripción no debe exceder los 100 caracteres'),

  body('IDWorkOrder')
    .notEmpty().withMessage('El ID de la orden de trabajo es obligatorio')
    .isInt({ gt: 0 }).withMessage('El ID de la orden de trabajo debe ser un número entero positivo')
];

module.exports = { commentsWOValidationRules };
