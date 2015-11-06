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

        this.User.create({
            email: this.username,
            password: this.password
        }, (res) => {
            this.$log.debug('signup:', res);
            //this.Storage.set('user', res.user);
            //
            //let authRedirect = this.Storage.get('authRedirect');
            //if (authRedirect) {
            //    this.Storage.remove('authRedirect');
            //    this.$window.location.replace(authRedirect);
            //} else {
            //    this.$window.location.replace('/');
            //}
        }, (err) => {
            this.$log.error('signup login', err);
        });
    }
}
