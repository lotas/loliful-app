export class LoginController {
    constructor(User, $log) {
        'ngInject';

        this.User = User;
    }

    login() {
        this.User.login({email: this.username, password: this.password}, (res) => {
            console.log(res);
        }, (err) => {
            console.log('error login', err)
        });
    }
}
