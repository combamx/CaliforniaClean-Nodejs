const { body } = require('express-validator');

const workOrderValidationRules = [
  body('Clave')
    .notEmpty().withMessage('La clave es obligatoria')
    .isInt().withMessage('La clave debe ser un número entero'),

  body('IDProject')
    .notEmpty().withMessage('El ID del proyecto es obligatorio')
    .isInt().withMessage('IDProject debe ser un número entero'),

  body('IDCustomer')
    .notEmpty().withMessage('El ID del cliente es obligatorio')
    .isInt().withMessage('IDCustomer debe ser un número entero'),

  body('Contact')
    .optional()
    .isLength({ max: 100 }).withMessage('El contacto no debe exceder los 100 caracteres'),

  body('Address')
    .optional()
    .isLength({ max: 100 }).withMessage('La dirección no debe exceder los 100 caracteres'),

  body('City')
    .optional()
    .isLength({ max: 100 }).withMessage('La ciudad no debe exceder los 100 caracteres'),

  body('Phone')
    .optional()
    .isLength({ max: 100 }).withMessage('El teléfono no debe exceder los 100 caracteres'),

  body('IDAssigned')
    .notEmpty().withMessage('El ID del asignado es obligatorio')
    .isInt().withMessage('IDAssigned debe ser un número entero'),

  body('IDProvider')
    .notEmpty().withMessage('El ID del proveedor es obligatorio')
    .isInt().withMessage('IDProvider debe ser un número entero'),

  body('Description')
    .optional()
    .isString().withMessage('La descripción debe ser texto'),

  body('DateOrder')
    .notEmpty().withMessage('La fecha de orden es obligatoria')
    .isISO8601().withMessage('Fecha de orden inválida'),

  body('DateEnd')
    .notEmpty().withMessage('La fecha de finalización es obligatoria')
    .isISO8601().withMessage('Fecha de finalización inválida'),

  body('IDType')
    .notEmpty().withMessage('El ID del tipo es obligatorio')
    .isInt().withMessage('IDType debe ser un número entero'),

  body('IDStatusWO')
    .notEmpty().withMessage('El ID del estatus de orden es obligatorio')
    .isInt().withMessage('IDStatusWO debe ser un número entero'),

  body('IDStatusCalendario')
    .notEmpty().withMessage('El ID del estatus de calendario es obligatorio')
    .isInt().withMessage('IDStatusCalendario debe ser un número entero'),

  body('IDStatus')
    .notEmpty().withMessage('El ID del estatus general es obligatorio')
    .isInt().withMessage('IDStatus debe ser un número entero'),
];

module.exports = { workOrderValidationRules };
