describe('Auth controllers', () => {
    beforeEach(angular.mock.module('loliful'));

    describe('LoginController', () => {
        let vm;

        beforeEach(inject(($controller, Storage, User) => {
            vm = $controller('LoginController');

            spyOn(Storage, 'set').and.callThrough();
            spyOn(User, 'login').and.callFake((credentials, cb) => {
                cb({user: 'userData'});
            });
        }));

        it('should have login function', () => {
            expect(vm.login).toEqual(jasmine.any(Function));
        });

        it('should login', inject(($window, User, Storage) => {
            vm.login();
            expect(User.login).toHaveBeenCalled();
            expect(Storage.set).toHaveBeenCalledWith('user', 'userData');
        }));
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

        it('should logout', inject((User, Storage) => {
            vm.logout();
            expect(User.logout).toHaveBeenCalled();
            expect(Storage.clearAll).toHaveBeenCalled();
        }));
    });
});
