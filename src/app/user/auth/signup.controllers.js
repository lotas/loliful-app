export class SignupController {
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

    signup() {
        this.saving = true;
        let userData = {
            email: this.username,
            password: this.password
        };

        this.User.create(userData, res => {
            this.$log.debug('signup:', res);
            this.User.login(userData, res2 => {
                this.$window.location.replace('/');
            }, err2 => {
                this.$log.debug('login err:', err2);
            });
        }, (err) => {
            this.$log.error('signup login', err);
        });
    }
}
