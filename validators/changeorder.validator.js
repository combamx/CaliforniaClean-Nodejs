const { body } = require('express-validator');

const changeOrderValidationRules = [
  body('Clave')
    .notEmpty().withMessage('La clave es obligatoria')
    .isInt({ gt: 0 }).withMessage('La clave debe ser un número entero positivo'),

  body('DateChange')
    .notEmpty().withMessage('La fecha de cambio es obligatoria')
    .isISO8601().toDate().withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)'),

  body('Amount')
    .notEmpty().withMessage('El monto es obligatorio')
    .isFloat({ gt: 0 }).withMessage('El monto debe ser un número positivo'),

  body('IDStatusCO')
    .notEmpty().withMessage('El ID del estado de la orden de cambio es obligatorio')
    .isInt({ gt: 0 }).withMessage('Debe ser un número entero positivo'),

  body('IDWorkOrder')
    .notEmpty().withMessage('El ID de la orden de trabajo es obligatorio')
    .isInt({ gt: 0 }).withMessage('Debe ser un número entero positivo'),

  body('IDProject')
    .notEmpty().withMessage('El ID del proyecto es obligatorio')
    .isInt({ gt: 0 }).withMessage('Debe ser un número entero positivo'),

  body('Description')
    .optional({ nullable: true })
    .isLength({ max: 1 }).withMessage('La descripción debe tener máximo 1 carácter'),

  body('User')
    .notEmpty().withMessage('El usuario es obligatorio')
    .isLength({ max: 50 }).withMessage('El nombre de usuario no debe exceder 50 caracteres'),

  body('Status')
    .notEmpty().withMessage('El estado es obligatorio')
    .isBoolean().withMessage('El estado debe ser un valor booleano')
];

module.exports = { changeOrderValidationRules };
