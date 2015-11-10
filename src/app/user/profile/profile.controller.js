export class ProfileController {
    /**
     *
     * @param {Object} currentUser
     */
    constructor(currentUser, User) {
        'ngInject';

        this.User = User;

        this.user = currentUser;
    }
}

export function resolveCurrentUser(User) {
    'ngInject';

    return User.getCurrent();
}
