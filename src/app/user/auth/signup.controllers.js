export class SignupController {
    /**
     *
     * @param {User} User
     * @param {Storage} Storage
     * @param {$window} $window
     * @param {$log} $log
     * @param toastr
     * @param flags
     */
    constructor(User, Storage, $window, $log, toastr, flags) {
        'ngInject';

        this.User = User;
        this.Storage = Storage;
        this.$log = $log;
        this.$window = $window;
        this.toastr = toastr;
    }

}
