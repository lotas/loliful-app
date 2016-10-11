'use strict';

describe('PageContact controllers', () => {
    var $httpBackend;
    var vm;

    beforeEach(angular.mock.module('loliful'));

    beforeEach(inject(($injector, $controller) => {
        $httpBackend = $injector.get('$httpBackend');
        vm = new $controller('PageContactController');
    }));
    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should send feedback', () => {
        $httpBackend.expect('POST', 'http://local.loliful.co/feedback').respond({});

        vm.feedback = 'hello';
        vm.sendFeedback();
        $httpBackend.flush();
    });

    it('should do nothing', () => {
        vm.feedback = false;
        vm.sendFeedback();
    });

    it('should define bestThings', () => {
        expect(vm.bestThing).toBeDefined();
        expect(vm.bestThing).toEqual(jasmine.any(String));
    });

    it('should define placeholder', () => {
        expect(vm.placeholder).toBeDefined();
        expect(vm.placeholder).toEqual(jasmine.any(String));
    });

});
