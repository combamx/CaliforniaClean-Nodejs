const { body } = require('express-validator');

const workOrdersOvertimeValidationRules = [
  body('DateOrder')
    .notEmpty().withMessage('La fecha de orden es obligatoria')
    .isISO8601().withMessage('La fecha de orden debe ser una fecha válida'),

  body('BeginTime')
    .notEmpty().withMessage('La hora de inicio es obligatoria')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Hora de inicio no válida (HH:mm)'),

  body('EndTime')
    .notEmpty().withMessage('La hora de fin es obligatoria')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Hora de fin no válida (HH:mm)'),

  body('People')
    .notEmpty().withMessage('Número de personas es obligatorio')
    .isInt({ min: 1 }).withMessage('People debe ser un número entero positivo'),

  body('TotalHrsPeople')
    .notEmpty().withMessage('Horas totales por persona es obligatorio')
    .isInt({ min: 1 }).withMessage('TotalHrsPeople debe ser un número entero positivo'),

  body('TotalHrsGroup')
    .notEmpty().withMessage('Horas totales del grupo es obligatorio')
    .isInt({ min: 1 }).withMessage('TotalHrsGroup debe ser un número entero positivo'),

  body('AmountHrs')
    .notEmpty().withMessage('Monto de horas es obligatorio')
    .isInt({ min: 1 }).withMessage('AmountHrs debe ser un número entero positivo'),

  body('IDProject')
    .notEmpty().withMessage('ID del proyecto es obligatorio')
    .isInt().withMessage('IDProject debe ser un número entero'),

  body('IDWorkOder')
    .notEmpty().withMessage('ID de la orden de trabajo es obligatorio')
    .isInt().withMessage('IDWorkOder debe ser un número entero'),
];

module.exports = { workOrdersOvertimeValidationRules };
