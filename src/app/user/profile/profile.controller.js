export class ProfileController {
    /**
     *
     * @param {Object} currentUser
     */
    constructor(currentUser, User, AuthService) {
        'ngInject';

        this.User = User;
        this.AuthService = AuthService;
        this.user = currentUser;

        this.stats = null;
        this.info = null;

        this.getStats();
        this.getInfo();
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
