const { body } = require('express-validator');

const providerValidationRules = [
  body('Name')
    .notEmpty().withMessage('El nombre del proveedor es obligatorio')
    .isLength({ max: 50 }).withMessage('El nombre no debe exceder los 50 caracteres'),

  body('Email')
    .optional({ nullable: true })
    .isEmail().withMessage('Debe proporcionar un correo electrónico válido')
    .isLength({ max: 50 }).withMessage('El email no debe exceder los 50 caracteres'),

  body('Address')
    .optional({ nullable: true })
    .isLength({ max: 50 }).withMessage('La dirección no debe exceder los 50 caracteres'),

  body('City')
    .optional({ nullable: true })
    .isLength({ max: 50 }).withMessage('La ciudad no debe exceder los 50 caracteres'),

  body('Zip')
    .optional({ nullable: true })
    .isInt().withMessage('El código postal debe ser un número'),

  body('Phone')
    .optional({ nullable: true })
    .isLength({ max: 50 }).withMessage('El teléfono no debe exceder los 50 caracteres'),

  body('Status')
    .notEmpty().withMessage('El estado es obligatorio')
    .isInt({ min: 0, max: 255 }).withMessage('El estado debe ser un número entero entre 0 y 255'),
];

module.exports = { providerValidationRules };
