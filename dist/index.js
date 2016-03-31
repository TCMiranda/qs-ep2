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

    var start = new Date(e.inicio_ano, e.inicio_mes - 1, e.inicio_dia, e.inicio_hora, e.inicio_minuto, e.inicio_segundos);
    var end = new Date(e.fim_ano, e.fim_mes - 1, e.fim_dia, e.fim_hora, e.fim_minuto, e.fim_segundos);

    console.log(start, end);

    return Promise.resolve(0.2);
}
//# sourceMappingURL=index.js.map