const { body } = require('express-validator');

const userValidationRules = [
  body('Username')
    .notEmpty().withMessage('El nombre de usuario es obligatorio')
    .isLength({ max: 50 }).withMessage('El nombre de usuario no debe exceder los 50 caracteres'),

  body('Password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6, max: 255 }).withMessage('La contraseña debe tener entre 6 y 255 caracteres'),

  body('Role')
    .optional()
    .isLength({ max: 50 }).withMessage('El rol no debe exceder los 50 caracteres'),

  body('CreatedAt')
    .optional()
    .isISO8601().withMessage('La fecha de creación debe tener un formato válido (ISO 8601)'),
];

module.exports = { userValidationRules };
