'use strict';

describe('Auth controllers', () => {
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

    describe('LoginController: flags', () => {
        let vm;

        beforeEach(inject(($controller) => {
            vm = $controller('LoginController', {
                flags: {
                    signupEnabled: false
                }
            });
        }));

        it('should define signupEnabled', () => {
            expect(vm.signupEnabled).toEqual(false);
        });
    });

    describe('LoginController', () => {
        let vm;

        beforeEach(inject(($controller, Storage, User) => {
            vm = $controller('LoginController');

            spyOn(Storage, 'set').and.callThrough();
            spyOn(Storage, 'remove').and.callThrough();
            spyOn(User, 'login').and.callFake((credentials, cb) => {
                cb({user: 'userData'});
            });
        }));

        it('should have login function', () => {
            expect(vm.login).toEqual(jasmine.any(Function));
        });

        it('should login', inject((User, Storage, $window) => {
            vm.login();
            expect(User.login).toHaveBeenCalled();
            expect(Storage.set).toHaveBeenCalledWith('user', 'userData');
            expect($window.location.replace).toHaveBeenCalledWith('/');
        }));

        describe('authRedirect', () => {
            beforeEach(inject((Storage) => {
                spyOn(Storage, 'get').and.callFake((key) => {
                    return key === 'authRedirect' ? '/something/else' : key;
                });
            }));
            it('should redirect to authRedirect value', inject((Storage, $window) => {
                vm.login();
                expect($window.location.replace).toHaveBeenCalledWith('/something/else');
                expect(Storage.remove).toHaveBeenCalledWith('authRedirect');
            }));
        });
    });

    describe('LogoutController', () => {
        let vm;

        beforeEach(inject(($controller, Storage, User) => {
            vm = $controller('LogoutController');

            spyOn(Storage, 'clearAll').and.callThrough();
            spyOn(User, 'logout').and.callFake(cb => {
                cb();
            });
        }));

        it('should have logout function', () => {
            expect(vm.logout).toEqual(jasmine.any(Function));
        });

        it('should logout', inject((User, Storage, $window) => {
            vm.logout();
            expect(User.logout).toHaveBeenCalled();
            expect(Storage.clearAll).toHaveBeenCalled();
            expect($window.location.replace).toHaveBeenCalledWith('/');
        }));
    });
});
