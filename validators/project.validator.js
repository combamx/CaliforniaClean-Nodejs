const { body } = require('express-validator');

const projectValidationRules = [
  body('ProjectName').notEmpty().withMessage('ProjectName es requerido'),
  body('Address').notEmpty().withMessage('Address es requerido'),
  body('City').optional().isString(),
  body('Description').optional().isString(),
  body('DateProject').optional().isISO8601().withMessage('Fecha inválida'),
  body('Amount').optional().isNumeric(),
  body('RetentionsProject').optional().isNumeric(),
  body('Retentions').optional().isNumeric(),
  body('SellerProject').optional().isNumeric(),
  body('Selle').optional().isNumeric(),
  body('IDCustomer').isInt().withMessage('IDCustomer debe ser entero'),
  body('IDSeller').optional().isInt(),
  body('IDProvide').optional().isInt(),
  body('IDTypeProject').optional().isInt(),
  body('IDTypeBuilding').optional().isInt(),
  body('AmountProvide').optional().isNumeric(),
  body('Inclusion').optional().isString(),
  body('OCIP').notEmpty().withMessage('OCIP es requerido'),
  body('Status').isInt().withMessage('Status debe ser entero')
];

module.exports = { projectValidationRules };