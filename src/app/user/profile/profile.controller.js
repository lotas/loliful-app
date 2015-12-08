export class ProfileController {
    /**
     *
     * @param {Object} currentUser
     */
    constructor(currentUser, User, AuthService, toastr) {
        'ngInject';

        this.User = User;
        this.AuthService = AuthService;
        this.user = currentUser;
        this.toastr = toastr;

        this.stats = null;
        this.info = null;

        this.getStats();
        this.getInfo();
    }

    setName() {
        this.User.setName({name: this.user.name}, res => {
            this.user.name = res.name.name;
            if (res.name.dup) {
                this.toastr.warning('Sorry, this username is already taken');
            } else {
                this.toastr.success('Name saved!');
            }
        });
    }

    getStats() {
        this.User.stats(this.user.id, res => {
            this.stats = res.stats;
        });
    }

    getInfo() {
        this.AuthService.loadInfo().then(res => {
            this.info = res;
        });
    }
}

export function resolveCurrentUser(User) {
    'ngInject';

    return User.getCurrent();
}
