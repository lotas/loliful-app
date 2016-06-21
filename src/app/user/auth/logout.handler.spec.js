'use strict';

describe('Logoout handler', () => {
    beforeEach(angular.mock.module('loliful'));

    let $window;

    beforeEach(() => {
        $window = {
            document: {
                cookie: 'empty'
            },
            location: {
                replace: jasmine.createSpy()
            }
        };

        angular.mock.module(($provide) => {
            $provide.value('$window', $window);
        });
    });

    describe('LogoutHandler', () => {
        beforeEach(inject(($state, Storage, User) => {
            $state.go('logout');

            spyOn(Storage, 'clearAll').and.callThrough();
            spyOn(User, 'logout').and.callFake(cb => {
                cb();
            });
            expect(User.logout).toHaveBeenCalled();
            expect(Storage.clearAll).toHaveBeenCalled();
            expect($window.location.replace).toHaveBeenCalledWith('/');
        }));
    });
});
