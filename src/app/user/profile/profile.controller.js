export class ProfileController {
    /**
     *
     * @param {User} User
     * @param {$log} $log
     */
    constructor(User, $log) {
        'ngInject';

        this.User = User;
        this.$log = $log;
    }

}
