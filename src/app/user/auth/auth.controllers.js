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

export class LogoutController {
    /**
     *
     * @param {User} User
     * @param {Storage} Storage
     * @param {$window} $window
     * @param toastr
     */
    constructor(User, Storage, $window, toastr) {
        'ngInject';

        this.User = User;
        this.Storage = Storage;
        this.$window = $window;
        this.toastr = toastr;

        this.logout();
    }

    /**
     * Cleanup session
     */
    logout() {
        this.toastr.info('See ya!');
        this.User.logout(() => {
            this.Storage.clearAll();
            this.$window.location.replace('/');
        });
    }
}
