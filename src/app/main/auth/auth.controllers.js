export class LoginController {
    /**
     *
     * @param {User} User
     * @param {Storage} Storage
     * @param {$state} $state
     * @param {$location} $location
     * @param {$log} $log
     */
    constructor(User, Storage, $state, $location, $log) {
        'ngInject';

        this.User = User;
        this.Storage = Storage;
        this.$log = $log;
        this.$state = $state;
        this.$location = $location;
    }

    login() {
        this.User.login({email: this.username, password: this.password}, (res) => {
            this.Storage.set('user', res.user);

            let authRedirect = this.Storage.get('authRedirect');
            if (authRedirect) {
                this.$location.url(authRedirect);
                this.Storage.remove('authRedirect');
            } else {
                this.$state.go('main');
            }
        }, (err) => {
            this.$log.error('error login', err)
        });
    }
}
