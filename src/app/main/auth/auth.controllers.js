export class LoginController {
    /**
     *
     * @param {User} User
     * @param {Storage} Storage
     * @param {$window} $window
     * @param {$log} $log
     */
    constructor(User, Storage, $window, $log) {
        'ngInject';

        this.User = User;
        this.Storage = Storage;
        this.$log = $log;
        this.$window = $window;
    }

    login() {
        this.User.login({email: this.username, password: this.password}, (res) => {
            this.Storage.set('user', res.user);

            let authRedirect = this.Storage.get('authRedirect');
            if (authRedirect) {
                this.Storage.remove('authRedirect');
                this.$window.location.replace(authRedirect);
            } else {
                this.$window.location.replace('/');
            }
        }, (err) => {
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
     */
    constructor(User, Storage, $window) {
        'ngInject';

        this.User = User;
        this.Storage = Storage;
        this.$window = $window;

        this.logout();
    }

    /**
     * Cleanup session
     */
    logout() {
        this.User.logout(() => {
            this.Storage.clearAll();
            this.$window.location.replace('/');
        });
    }
}
