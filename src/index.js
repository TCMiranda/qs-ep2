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

    const start = new Date(e.inicio_ano, e.inicio_mes - 1, e.inicio_dia, e.inicio_hora, e.inicio_minuto, e.inicio_segundo);
    const end = new Date(e.fim_ano, e.fim_mes - 1, e.fim_dia, e.fim_hora, e.fim_minuto, e.fim_segundo);

    const time_start = +start;
    const time_end = +end;

    const event_time = time_end - time_start;

    Joi.assert(event_time, Joi.number().min(0));

    const time_to_8 = 8 * 60 * 60 * 1000;
    const time_to_18 = 18 * 60 * 60 * 1000;
    const time_to_24 = 24 * 60 * 60 * 1000;

    const no_promotional_time = time_to_18 - time_to_8;
    const promotional_time = time_to_24 - no_promotional_time;

    let current_time_start = (e.inicio_hora * 60 * 60 * 1000) +
                               (e.inicio_minuto * 60 * 1000) +
                               (e.inicio_segundo * 1000);

    let missing_price_time = event_time;
    let promotional_price_time = 0;

    while (missing_price_time > 0) {

        /* first slice */
        if (current_time_start < time_to_8) {

            if (current_time_start + missing_price_time > time_to_8) {

                promotional_price_time += time_to_8 - current_time_start;
                missing_price_time -= time_to_8 - current_time_start
                current_time_start = time_to_8;

            } else {

                promotional_price_time += missing_price_time;
                current_time_start += missing_price_time;
                missing_price_time = 0;
            }
        }

        /* second slice */
        else if (current_time_start < time_to_18) {

            if (current_time_start + missing_price_time > time_to_18) {

                promotional_price_time += missing_price_time;
                current_time_start += missing_price_time;
                missing_price_time = 0;

            } else {

                current_time_start += missing_price_time;
                missing_price_time = 0;
            }
        }

        /* third slice */
        else {

            if (current_time_start + missing_price_time > time_to_24) {

                promotional_price_time += time_to_24 - current_time_start;
                missing_price_time -= time_to_24 - current_time_start
                current_time_start = time_to_24;

            } else {

                current_time_start += missing_price_time;
                missing_price_time = 0;
            }
        }
    }

    let total_price = (
        (Math.ceil(promotional_price_time/60) * 0.2) +
        ((Math.ceil(event_time/60) - Math.ceil(promotional_price_time/60)) * 0.4)
    );


    /* 15% discont after one hour */
    (event_time > 60 * 60 * 1000) && (total_price = total_price * 0.85);

    return Promise.resolve(
        total_price/1000
    );
}
