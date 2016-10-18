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
            this.toastr.success('Доброго дня!');

            let authRedirect = this.Storage.get('authRedirect');
            if (authRedirect) {
                this.Storage.remove('authRedirect');
                this.$window.location.replace(authRedirect);
            } else {
                this.$window.location.replace('/');
            }
        }, (err) => {
            this.toastr.error('Неполучится!');
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



export class InviteController {
    /**
     *
     * @param {User} User
     * @param {UserService} UserService
     */
    constructor(User, UserService, AuthService, Storage, $state, $log) {
        'ngInject';

        this.UserService = UserService;
        this.Storage = Storage;
        this.AuthService = AuthService;
        this.$state = $state;
        this.$log = $log;
    }

    onlyAsk() {
        this.invite = 'ik_will_nur_nachfragen';
        this.checkInvite();
    }

    checkInvite() {
        this.loading = true;
        this.invalidInvite = false;
        this.inviteUsed = false;

        this.AuthService.loadToken(
            this.Storage.get('auth.shortToken'),
            this.invite
        ).then(data => {
            this.$log.debug('Valid invite', data);
            this.Storage.remove('auth.shortToken');
            this.$state.go('login.first-run');
        }).catch(err => {
            if (err.status) {
                this.$log.debug(`Invalid token: ${err.status}`);
                if (err.status === 402) {
                    this.invalidInvite = true;
                } else if (err.status === 412) {
                    this.inviteUsed = true;
                } else if (err.status === 404) {
                    this.$state.go('login');
                }
            }
        }).finally(() => {
            this.loading = false;
        });
    }

}
