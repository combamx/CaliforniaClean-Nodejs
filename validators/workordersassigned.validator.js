const { body } = require('express-validator');

const workOrdersAssignedValidationRules = [
  body('Clave')
    .notEmpty().withMessage('La clave es obligatoria')
    .isInt().withMessage('La clave debe ser un número entero'),

  body('DateAssigned')
    .notEmpty().withMessage('La fecha asignada es obligatoria')
    .isISO8601().withMessage('Fecha asignada inválida'),

  body('IDWorker')
    .notEmpty().withMessage('El ID del trabajador es obligatorio')
    .isInt().withMessage('IDWorker debe ser un número entero'),

  body('IDProveedor')
    .notEmpty().withMessage('El ID del proveedor es obligatorio')
    .isInt().withMessage('IDProveedor debe ser un número entero'),

  body('Order')
    .notEmpty().withMessage('El campo "Order" es obligatorio')
    .isInt().withMessage('"Order" debe ser un número entero'),

  body('Status')
    .notEmpty().withMessage('El estatus es obligatorio')
    .isInt().withMessage('Status debe ser un número entero'),

  body('Document')
    .notEmpty().withMessage('El documento es obligatorio')
    .isLength({ max: 50 }).withMessage('El documento no debe exceder 50 caracteres'),

  body('Description')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ max: 50 }).withMessage('La descripción no debe exceder 50 caracteres'),
];

module.exports = { workOrdersAssignedValidationRules };
