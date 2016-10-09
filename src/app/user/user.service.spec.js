'use strict';

describe('User Service', () => {
    let $httpBackend;

    beforeEach(angular.mock.module('loliful'));

    beforeEach(inject(($injector) => {
        $httpBackend = $injector.get('$httpBackend');
    }));
    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should call loadInfo()', inject((UserService) => {
        $httpBackend.expect('GET', 'http://local.loliful.co/avatar/1234').respond({me: {}});
        UserService.loadAvatar('1234');
        $httpBackend.flush();
    }));

    it('Should call getProfile()', inject((UserService) => {
        $httpBackend.expect('GET', 'http://local.loliful.co/profile/1234').respond({profile: {}});
        UserService.getProfile('1234');
        $httpBackend.flush();
    }));

    it('Should call loadAvatar()', inject((UserService) => {
        $httpBackend.expect('GET', 'http://local.loliful.co/me').respond({me: {}});
        UserService.loadInfo();
        $httpBackend.flush();
    }));

});
