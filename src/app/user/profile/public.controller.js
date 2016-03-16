export class ProfilePublicController {
    /**
     *
     * @param {Object} currentUser
     */
    constructor(profile, User, UserService, toastr) {
        'ngInject';

        this.User = User;
        this.UserService = UserService;
        this.profile = profile;
        this.toastr = toastr;

        this.stats = null;
        this.info = null;
    }

}

export function resolvePublicProfile(UserService, $stateParams) {
    'ngInject';

    return UserService.getProfile($stateParams.id);
}
