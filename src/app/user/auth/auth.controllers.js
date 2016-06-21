export class LoginController {
    /**
     *
     * @param {User} User
     * @param {Storage} Storage
     * @param {$window} $window
     * @param {$log} $log
     * @param toastr
     * @param {Object} $flags
     */
    constructor(User, Storage, $window, $log, toastr, flags) {
        'ngInject';

        this.User = User;
        this.Storage = Storage;
        this.$log = $log;
        this.$window = $window;
        this.toastr = toastr;
        this.signupEnabled = flags.signupEnabled;
    }

    login() {
        this.User.login({
            email: this.username,
            password: this.password,
            rememberMe: this.rememberMe
        }, (res) => {
            this.Storage.set('user', res.user);
            this.toastr.success('Welcome!');

            let authRedirect = this.Storage.get('authRedirect');
            if (authRedirect) {
                this.Storage.remove('authRedirect');
                this.$window.location.replace(authRedirect);
            } else {
                this.$window.location.replace('/');
            }
        }, (err) => {
            this.toastr.error('Cannot login!');
            this.$log.error('error login', err);
        });
    }
}


export class FirstRunController {
    /**
     *
     * @param {User} User
     * @param {UserService} UserService
     */
    constructor(User, UserService, $timeout) {
        'ngInject';

        this.UserService = UserService;

        this.user = false;
        User.getCurrent().$promise.then(user => {
            this.user = user;
        });

        this.startProgress($timeout);
    }

    setFirstRun() {
        this.UserService.setFirstRun();
    }

    startProgress($timeout) {
        var vm = this;

        var circle = angular.element('#svg #bar');
        vm.val = 0;
        var r = 90; //circle.attr('r');

        var c = Math.PI * (r * 2);

        drawNext();

        function drawNext() {
            var pct = ((100 - vm.val) / 100) * c;

            circle.css({strokeDashoffset: pct});

            vm.val += 5;
            if (vm.val <= 100) {
                $timeout(drawNext, 350);
            }
        }
    }

}
