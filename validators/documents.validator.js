const { body } = require('express-validator');

const documentsValidationRules = [
  body('Name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ max: 50 }).withMessage('El nombre no debe exceder los 50 caracteres'),

  body('Description')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ max: 100 }).withMessage('La descripción no debe exceder los 100 caracteres'),

  body('Url')
    .notEmpty().withMessage('La URL es obligatoria')
    .isLength({ max: 100 }).withMessage('La URL no debe exceder los 100 caracteres'),

  body('IDCustomer')
    .notEmpty().withMessage('El ID del cliente es obligatorio')
    .isInt({ gt: 0 }).withMessage('El ID del cliente debe ser un número entero positivo'),

  body('IDProvide')
    .notEmpty().withMessage('El ID del proveedor es obligatorio')
    .isInt({ gt: 0 }).withMessage('El ID del proveedor debe ser un número entero positivo'),

  body('IDProject')
    .notEmpty().withMessage('El ID del proyecto es obligatorio')
    .isInt({ gt: 0 }).withMessage('El ID del proyecto debe ser un número entero positivo'),

  body('IDWorkOrder')
    .notEmpty().withMessage('El ID de la orden de trabajo es obligatorio')
    .isInt({ gt: 0 }).withMessage('El ID de la orden de trabajo debe ser un número entero positivo'),

  body('IDChangeOrden')
    .notEmpty().withMessage('El ID de la orden de cambio es obligatorio')
    .isInt({ gt: 0 }).withMessage('El ID de la orden de cambio debe ser un número entero positivo'),

  body('Expiration')
    .notEmpty().withMessage('La expiración es obligatoria')
    .isLength({ max: 50 }).withMessage('La expiración no debe exceder los 50 caracteres'),

  body('Type')
    .notEmpty().withMessage('El tipo de documento es obligatorio')
    .isInt({ gt: 0 }).withMessage('El tipo debe ser un número entero positivo'),

  body('Status')
    .notEmpty().withMessage('El estatus es obligatorio')
    .isInt({ min: 0 }).withMessage('El estatus debe ser un número entero válido'),
];

module.exports = { documentsValidationRules };
