export class LoginController {
    constructor (User, $log) {
        'ngInject';
        this.User = User;

        $log.debug(User);

    }

    login() {
        this.toastr.info('na ja');
    }
}
