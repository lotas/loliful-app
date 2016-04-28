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
        $httpBackend.expect('GET', 'http://local.loliful.io/avatar/1').respond({});

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

        $httpBackend.expect('POST', 'http://local.loliful.io/users/name').respond({name: 'name'});
        vm.setName();
        $httpBackend.flush();
    });

});
