/* global beforeEach */
/* global afterEach */
/* global it */
/* global describe */
/* global jasmine */
/* global expect */
'use strict';

describe('Profile controller', () => {
    var $httpBackend;

    beforeEach(angular.mock.module('loliful'));

    beforeEach(inject(($injector, $controller) => {
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.expect('GET', 'http://local.loliful.io/users/stats?userId=1').respond({stats: {}});
        $httpBackend.expect('GET', 'http://local.loliful.io/users/1/notificationSettings').respond({emailReply: 1});
        $httpBackend.expect('GET', 'http://local.loliful.io/me').respond({});

        $controller('ProfileController', {
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

    // it('Should load user stats', () => {
    //     $httpBackend.flush();
    //     $rootScope.$apply();
    //     expect(vm.info).toEqual({});
    //     expect(vm.stats).toEqual({});
    //     expect(vm.notifications).toBeDefined({});
    // });

    // it('should setName()', () => {
    //     $httpBackend.flush();

    //     $httpBackend.expect('POST', 'http://local.loliful.io/users/1/name').respond({name: 'name'});
    //     vm.setName({$invalid: false});
    //     $httpBackend.flush();
    // });
    // it('should not setName()', () => {
    //     $httpBackend.flush();
    //     expect(vm.setName({$invalid: true})).toBeFalsy();
    // });

    // it('should setAbout()', () => {
    //     $httpBackend.flush();

    //     $httpBackend.expect('POST', 'http://local.loliful.io/users/1/about').respond({about: 'about'});
    //     vm.setAbout();
    //     $httpBackend.flush();
    // });

    //it('should update settings()', () => {
    //    $httpBackend.expect('PUT', 'http://local.loliful.io/users/1/notificatoinSettings')
    //        .respond({emailReply: 1});
    //    vm.saveSettings();
    //    $httpBackend.flush();
    //});

});
