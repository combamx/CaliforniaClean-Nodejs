const { body } = require('express-validator');

const typeDocumentProjectsValidationRules = [
  body('Description')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ max: 50 }).withMessage('La descripción no debe exceder los 50 caracteres'),

  body('IDTypeProject')
    .notEmpty().withMessage('El ID del tipo de proyecto es obligatorio')
    .isInt({ min: 1 }).withMessage('El ID del tipo de proyecto debe ser un número entero positivo'),
];

module.exports = { typeDocumentProjectsValidationRules };
