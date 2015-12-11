'use strict';

describe('Auth Service', () => {
    let $httpBackend;

    beforeEach(angular.mock.module('loliful'));

    beforeEach(inject(($injector) => {
        $httpBackend = $injector.get('$httpBackend');
    }));
    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should call hasToken()', inject((AuthService) => {
        expect(AuthService.hasToken()).toBeFalsy();
    }));

    it('Should call loadInfo()', inject((AuthService) => {
        $httpBackend.expect('GET', 'http://local.loliful.io/me').respond({me: {}});
        AuthService.loadInfo();
        $httpBackend.flush();
    }));

    it('Should call setToken()', inject((AuthService, LoopBackAuth) => {
        spyOn(LoopBackAuth, 'setUser').and.returnValue(0);
        spyOn(LoopBackAuth, 'save').and.returnValue(1);

        AuthService.setToken(1, 1);
        expect(LoopBackAuth.setUser).toHaveBeenCalledWith(1, 1, 1);
        expect(LoopBackAuth.save).toHaveBeenCalled();
    }));
});
