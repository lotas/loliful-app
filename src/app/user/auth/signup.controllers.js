export class SignupController {
    /**
     *
     * @param {User} User
     * @param {Storage} Storage
     * @param {$window} $window
     * @param {$log} $log
     * @param toastr
     */
    constructor(User, Storage, $window, $log, toastr) {
        'ngInject';

        this.User = User;
        this.Storage = Storage;
        this.$log = $log;
        this.$window = $window;
        this.toastr = toastr;
    }

    signup() {
        this.saving = true;
        let userData = {
            email: this.username,
            password: this.password
        };

        this.User.create(userData, res => {
            this.$log.debug(res);
            this.toastr.success('Signup complete!');
            this.User.login(userData, res2 => {
                this.$log.debug(res2);
                this.$window.location.replace('/');
            }, err2 => {
                this.$log.debug('login err:', err2);
            });
        }, (err) => {
            this.toastr.error('Error creating user');
            this.$log.error('signup login', err);
            this.saving = false;
        });
    }
}
