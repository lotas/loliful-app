export class LoginController {
    constructor (User) {
        'ngInject';
        this.User = User;
    }

    login() {
        this.toastr.info('na ja');
    }
}
