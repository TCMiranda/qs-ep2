'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Joi$object$keys;

exports.default = calculaTarifa;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

require('es6-promise').polyfill();
require('babel-polyfill');

var dateValidations = {
    dia: _joi2.default.number().min(1).max(31),
    mes: _joi2.default.number().min(1).max(12),
    ano: _joi2.default.number().min(1860).max(2016),
    hora: _joi2.default.number().min(0).max(23),
    minuto: _joi2.default.number().min(0).max(59),
    segundo: _joi2.default.number().min(0).max(59)
};

var eventDateObject = {
    inicio_dia: dateValidations.dia,
    inicio_mes: dateValidations.mes,
    inicio_ano: dateValidations.ano,
    inicio_hora: dateValidations.hora,
    inicio_minuto: dateValidations.minuto,
    inicio_segundo: dateValidations.segundo,
    fim_dia: dateValidations.dia.min(_joi2.default.ref('inicio_dia')),
    fim_mes: dateValidations.mes.min(_joi2.default.ref('inicio_mes')),
    fim_ano: dateValidations.ano.min(_joi2.default.ref('inicio_ano')),
    fim_hora: dateValidations.hora.min(_joi2.default.ref('inicio_hora')),
    fim_minuto: dateValidations.minuto.min(_joi2.default.ref('inicio_minuto')),
    fim_segundo: dateValidations.segundo.min(_joi2.default.ref('inicio_segundo'))
};

var eventDateSchema = (_Joi$object$keys = _joi2.default.object().keys(eventDateObject)).requiredKeys.apply(_Joi$object$keys, _toConsumableArray(Object.keys(eventDateObject)));

function calculaTarifa(e) {

    _joi2.default.assert(e, eventDateSchema);

    var start = new Date(e.inicio_ano, e.inicio_mes - 1, e.inicio_dia, e.inicio_hora, e.inicio_minuto, e.inicio_segundo);
    var end = new Date(e.fim_ano, e.fim_mes - 1, e.fim_dia, e.fim_hora, e.fim_minuto, e.fim_segundo);

    var time_start = +start;
    var time_end = +end;

    var event_time = time_end - time_start;

    _joi2.default.assert(event_time, _joi2.default.number().min(0));

    var time_to_8 = 8 * 60 * 60 * 1000;
    var time_to_18 = 18 * 60 * 60 * 1000;
    var time_to_24 = 24 * 60 * 60 * 1000;

    var no_promotional_time = time_to_18 - time_to_8;
    var promotional_time = time_to_24 - no_promotional_time;

    var current_time_start = e.inicio_hora * 60 * 60 * 1000 + e.inicio_minuto * 60 * 1000 + e.inicio_segundo * 1000;

    var missing_price_time = event_time;
    var promotional_price_time = 0;

    while (missing_price_time > 0) {

        /* first slice */
        if (current_time_start < time_to_8) {

            if (current_time_start + missing_price_time > time_to_8) {

                promotional_price_time += time_to_8 - current_time_start;
                missing_price_time -= time_to_8 - current_time_start;
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
                        missing_price_time -= time_to_24 - current_time_start;
                        current_time_start = time_to_24;
                    } else {

                        current_time_start += missing_price_time;
                        missing_price_time = 0;
                    }
                }
    }

    var total_price = Math.ceil(promotional_price_time / 60) * 0.2 + (Math.ceil(event_time / 60) - Math.ceil(promotional_price_time / 60)) * 0.4;

    /* 15% discont after one hour */
    event_time > 60 * 60 * 1000 && (total_price = total_price * 0.85);

    return Promise.resolve(total_price / 1000);
}
//# sourceMappingURL=index.js.map