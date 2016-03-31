require('es6-promise').polyfill();
require('babel-polyfill');

import Joi from 'joi';

const dateValidations = {
    dia: Joi.number().min(1).max(31),
    mes: Joi.number().min(1).max(12),
    ano: Joi.number().min(1860).max(2016),
    hora: Joi.number().min(0).max(23),
    minuto: Joi.number().min(0).max(59),
    segundo: Joi.number().min(0).max(59)
}

const eventDateObject = {
    inicio_dia: dateValidations.dia,
    inicio_mes: dateValidations.mes,
    inicio_ano: dateValidations.ano,
    inicio_hora: dateValidations.hora,
    inicio_minuto: dateValidations.minuto,
    inicio_segundo: dateValidations.segundo,
    fim_dia: dateValidations.dia.min(Joi.ref('inicio_dia')),
    fim_mes: dateValidations.mes.min(Joi.ref('inicio_mes')),
    fim_ano: dateValidations.ano.min(Joi.ref('inicio_ano')),
    fim_hora: dateValidations.hora.min(Joi.ref('inicio_hora')),
    fim_minuto: dateValidations.minuto.min(Joi.ref('inicio_minuto')),
    fim_segundo: dateValidations.segundo.min(Joi.ref('inicio_segundo'))
};

const eventDateSchema = Joi.object().keys(eventDateObject).requiredKeys(...Object.keys(eventDateObject));

export default function calculaTarifa(e) {

    Joi.assert(e, eventDateSchema);

    const start = new Date(e.inicio_ano, e.inicio_mes - 1, e.inicio_dia, e.inicio_hora, e.inicio_minuto, e.inicio_segundos);
    const end = new Date(e.fim_ano, e.fim_mes - 1, e.fim_dia, e.fim_hora, e.fim_minuto, e.fim_segundos);

    console.log(start, end)

    return Promise.resolve(
        0.2
    );
}
