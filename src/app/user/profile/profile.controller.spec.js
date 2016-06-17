/* global beforeEach */
/* global afterEach */
/* global it */
/* global describe */
/* global jasmine */
/* global expect */
'use strict';

describe('Profile controller', () => {
    var $httpBackend;
    var $rootScope;
    var vm;

    beforeEach(angular.mock.module('loliful'));

    beforeEach(inject(($injector, $controller) => {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');

        $httpBackend.expect('GET', 'http://local.loliful.io/users/stats?userId=1').respond({stats: {}});
        $httpBackend.expect('GET', 'http://local.loliful.io/me').respond({});

        vm = $controller('ProfileController', {
            currentUser: {
                name: 'test',
                id: 1,
                $promise: {
                    then: function(cb) {
                        cb();
                    }
                }
            }
        });
    }));
    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should load user stats', () => {
        $httpBackend.flush();
        $rootScope.$apply();
        expect(vm.info).toEqual({});
        expect(vm.stats).toEqual({});
    });


    it('should setName()', () => {
        $httpBackend.flush();

        $httpBackend.expect('POST', 'http://local.loliful.io/users/1/name').respond({name: 'name'});
        vm.setName({$invalid: false});
        $httpBackend.flush();
    });
    it('should not setName()', () => {
        $httpBackend.flush();
        expect(vm.setName({$invalid: true})).toBeFalsy();
    });

    it('should setAbout()', () => {
        $httpBackend.flush();

        $httpBackend.expect('POST', 'http://local.loliful.io/users/1/about').respond({about: 'about'});
        vm.setAbout();
        $httpBackend.flush();
    });

});
