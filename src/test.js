require('es6-promise').polyfill();
require("babel-polyfill");

import handler from './index.js';

import expect from 'expect.js';

describe('Calcula Tarifa', function() {

    it(`Deve ser uma função`, function(done) {

        expect(typeof handler).to.be('function');

        done();
    });

    describe('Deve realizar o calculo corretamente', function() {

        it(`Teste 1`, function(done) {

            expect(typeof handler).to.be('function');

            handler({
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
            }).then( res => {

                expect(res).equal(0.2);

            }).then(() => (
                done()
            )).catch( err => done(err));;
        });

        it(`Teste 2`, function(done) {

            expect(typeof handler).to.be('function');

            handler({
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
            }).then( res => {

                expect(res).equal(0.2);

            }).then(() => (
                done()
            )).catch( err => done(err));
        });
    });

    describe('Deve falhar na execução', function() {

        it(`Teste 1`, function(done) {

            expect(typeof handler).to.be('function');

            expect(handler).withArgs({
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

        it(`Teste 2`, function(done) {

            expect(typeof handler).to.be('function');

            expect(handler).withArgs({
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
