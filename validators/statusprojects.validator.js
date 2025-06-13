const { body } = require('express-validator');

const statusProjectsValidationRules = [
  body('Description')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ max: 50 }).withMessage('La descripción no debe exceder los 50 caracteres'),
];

module.exports = { statusProjectsValidationRules };
