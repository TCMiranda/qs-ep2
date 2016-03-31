'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

var _expect = require('expect.js');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('es6-promise').polyfill();
require("babel-polyfill");

describe('Calcula Tarifa', function () {

    it('Deve ser uma função', function (done) {

        (0, _expect2.default)(typeof _index2.default === 'undefined' ? 'undefined' : _typeof(_index2.default)).to.be('function');

        done();
    });

    describe('Deve realizar o calculo corretamente', function () {

        it('Teste 1', function (done) {

            (0, _expect2.default)(typeof _index2.default === 'undefined' ? 'undefined' : _typeof(_index2.default)).to.be('function');

            (0, _index2.default)({
                inicio_dia: 1,
                inicio_mes: 1,
                inicio_ano: 1860,
                inicio_hora: 0,
                inicio_minuto: 0,
                inicio_segundo: 0,
                fim_dia: 1,
                fim_mes: 1,
                fim_ano: 1860,
                fim_hora: 0,
                fim_minuto: 1,
                fim_segundo: 0
            }).then(function (res) {

                (0, _expect2.default)(res).equal(0.2);
            }).then(function () {
                return done();
            }).catch(function (err) {
                return done(err);
            });;
        });

        it('Teste 2', function (done) {

            (0, _expect2.default)(typeof _index2.default === 'undefined' ? 'undefined' : _typeof(_index2.default)).to.be('function');

            (0, _index2.default)({
                inicio_dia: 1,
                inicio_mes: 1,
                inicio_ano: 1860,
                inicio_hora: 0,
                inicio_minuto: 0,
                inicio_segundo: 0,
                fim_dia: 1,
                fim_mes: 1,
                fim_ano: 1860,
                fim_hora: 0,
                fim_minuto: 1,
                fim_segundo: 0
            }).then(function (res) {

                (0, _expect2.default)(res).equal(0.2);
            }).then(function () {
                return done();
            }).catch(function (err) {
                return done(err);
            });
        });
    });

    describe('Deve falhar na execução', function () {

        it('Teste 1', function (done) {

            (0, _expect2.default)(typeof _index2.default === 'undefined' ? 'undefined' : _typeof(_index2.default)).to.be('function');

            (0, _expect2.default)(_index2.default).withArgs({
                inicio_dia: 2,
                inicio_mes: 1,
                inicio_ano: 1860,
                inicio_hora: 0,
                inicio_minuto: 0,
                inicio_segundo: 0,
                fim_dia: 1,
                fim_mes: 1,
                fim_ano: 1860,
                fim_hora: 0,
                fim_minuto: 1,
                fim_segundo: 0
            }).to.throwException();

            done();
        });

        it('Teste 2', function (done) {

            (0, _expect2.default)(typeof _index2.default === 'undefined' ? 'undefined' : _typeof(_index2.default)).to.be('function');

            (0, _expect2.default)(_index2.default).withArgs({
                inicio_dia: 2,
                inicio_mes: 1,
                inicio_ano: 1860,
                inicio_hora: 0,
                inicio_minuto: 0,
                inicio_segundo: 0,
                fim_dia: 1,
                fim_mes: 1,
                fim_ano: 1860,
                fim_hora: 0,
                fim_minuto: 1,
                fim_segundo: 0
            }).to.throwException();

            done();
        });
    });
});
//# sourceMappingURL=test.js.map