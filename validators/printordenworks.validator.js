const { body } = require('express-validator');

const printOrdenWorksValidationRules = [
  body('IDWorkOrder')
    .notEmpty().withMessage('El ID de la orden de trabajo es obligatorio')
    .isInt({ gt: 0 }).withMessage('El ID de la orden de trabajo debe ser un número entero positivo'),

  body('Compania')
    .notEmpty().withMessage('La compañía es obligatoria')
    .isLength({ max: 50 }).withMessage('La compañía no debe exceder los 50 caracteres'),

  body('Project')
    .notEmpty().withMessage('El proyecto es obligatorio')
    .isLength({ max: 50 }).withMessage('El proyecto no debe exceder los 50 caracteres'),

  body('DatePrint')
    .notEmpty().withMessage('La fecha de impresión es obligatoria')
    .isISO8601().withMessage('La fecha de impresión debe tener formato válido (YYYY-MM-DD)'),

  body('Hour')
    .notEmpty().withMessage('La hora es obligatoria')
    .isLength({ max: 50 }).withMessage('La hora no debe exceder los 50 caracteres'),

  body('Contact')
    .notEmpty().withMessage('El contacto es obligatorio')
    .isLength({ max: 50 }).withMessage('El contacto no debe exceder los 50 caracteres'),

  body('Phone')
    .notEmpty().withMessage('El teléfono es obligatorio')
    .isLength({ max: 50 }).withMessage('El teléfono no debe exceder los 50 caracteres'),

  body('Address')
    .notEmpty().withMessage('La dirección es obligatoria')
    .isLength({ max: 50 }).withMessage('La dirección no debe exceder los 50 caracteres'),

  body('City')
    .notEmpty().withMessage('La ciudad es obligatoria')
    .isLength({ max: 50 }).withMessage('La ciudad no debe exceder los 50 caracteres'),

  body('Assigned')
    .notEmpty().withMessage('El campo Assigned es obligatorio')
    .isLength({ max: 50 }).withMessage('El campo Assigned no debe exceder los 50 caracteres'),

  body('Description')
    .optional({ nullable: true })
    .isLength({ max: 600 }).withMessage('La descripción no debe exceder los 600 caracteres'),

  body('Change')
    .optional({ nullable: true })
    .isLength({ max: 200 }).withMessage('El campo Change no debe exceder los 200 caracteres'),
];

module.exports = { printOrdenWorksValidationRules };
